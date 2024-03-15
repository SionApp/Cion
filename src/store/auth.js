import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
//
import { supabase } from "../boot/supabase";
import useNotify from "src/composables/useNotify";
import { FRONTEND_REDIRECT_URL as URL } from "../sources/const";

const notify = useNotify();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // este state se penso para tener la informacion del usuario, pero no lo usamos.
    authUser: null,
    resetForm: false,
  }),
  actions: {
    async getSessionUser() {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      this.authUser = data.user;
    },

    setUserRole(userRole) {
      this.userRole = userRole;
    },
    getUserRole() {
      return this.userRole;
    },
    async signUp(payload) {
      return supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
      });
    },

    async sendInvitationEmail(dataUser) {
      try {
        const { data: existingInvitation } = await supabase
          .from("invitations")
          .select("*")
          .match({ email: dataUser.email })
          .limit(1);
        if (existingInvitation && existingInvitation.length > 0) {
          notify.notifyWarning(
            `El usuario ${dataUser.email} ya ha sido invitado previamente.`,
          );
          return;
        }

        const expiresAt = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
        const token = uuidv4();

        const { error: insertError } = await supabase
          .from("invitations")
          .insert({
            email: dataUser.email,
            token,
            expired_at: expiresAt,
          });

        if (insertError) throw insertError;

        // Construir el enlace de registro
        const url = `${URL}/?token=${token}`;
        const nameUser = dataUser.firstName || "User";
        const htmlTemplate = `
          <h1>¡Has sido invitado!</h1>
          <p>Hola %name%, has sido invitado a nuestra plataforma.</p>
          <p>Da click en el siguiente link para completar tu registro:</p>
          <a href="%link%">Link de Registro</a>
        `;

        const templateSendGrid = htmlTemplate
          .replace("%name%", nameUser)
          .replace("%email%", dataUser.email)
          .replace("%link%", url);

        const body = {
          to: dataUser.email,
          from: "danztty@gmail.com",
          subject: "Invitation to Sion Band",
          text: "Invited",
          html: templateSendGrid,
        };

        const response = await fetch(
          "http://localhost:54321/functions/v1/send-email",
          {
            method: "POST",
            body: JSON.stringify(body),
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );

        notify.notifySuccess(
          `Correo electrónico de invitación enviado a ${dataUser.email}.`,
        );
      } catch (error) {
        notify.notifyError(`No se Pudo enviar la invitacion. ${error}`);
      }
    },
    async validateInvitationToken(token) {
      const { data: invitation, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("token", token)
        .single();

      if (error) {
        return false;
      }

      if (!invitation) {
        return false;
      }

      return invitation;
    },
    async deleteInvitation(token) {
      return await supabase.from("invitations").delete().eq("token", token);
    },

    async signOutUser() {
      await supabase.auth.signOut();
      this.authUser = null;
      this.user = null;
    },

    async loadUserTable() {
      const { data: dataUser, error } = await supabase
        .from("users")
        .select(`*, roles(id,name)`)
        .limit(1)
        .single();
      if (error) throw error;
    },
  },
  getters: {
    isLoggedIn() {
      return !!this.user;
    },
    async getUser() {
      await this.getSessionUser();
    },
    roleAccessType() {
      return this.user && this.user.access_role_id;
    },
  },
});
