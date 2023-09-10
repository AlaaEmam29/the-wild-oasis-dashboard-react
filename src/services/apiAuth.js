import supabase, { supabaseImagePathStorage } from "./supabase";

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error("Invalid Login. Please check your email and password.");
  }
  return data;
};
export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return user;
};

export const logout = async () => {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const signUp = async ({ email, password, fullName }) => {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateUserData = async ({ password, fullName, avatar }) => {
  let updateData = {};
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;
  const avatarFile = `avatar-${data.user.id}-${Math.random()}`;
  const { data: dataAvatar, error: errorAvatar } = await supabase.storage
    .from("avatars")
    .upload(avatarFile, avatar);

  if (errorAvatar) {
    throw new Error(errorAvatar.message);
  }
  updateData = {
    data: {
      avatar: `${supabaseImagePathStorage}/avatars/${avatarFile}`,
    },
  };
  const { data: userAvatarData, error: errorUserAvatar } =
    await supabase.auth.updateUser(updateData);
  if (errorUserAvatar) {
    throw new Error(errorUserAvatar.message);
  }

  return userAvatarData;
};
