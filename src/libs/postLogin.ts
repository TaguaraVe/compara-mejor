interface PostLoginParams {
  email: string;
  password: string;
}
export const postLogin = async (values: PostLoginParams) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok', response);
    }
    return await response.json();
  } catch (error) {
    console.log('[POSTLOGIN_ERROR]', error);
  }
};

interface UpdateUserParams {
  id: string;
  password: string;
}
export const postUpdateUser = async (values: UpdateUserParams) => {
  try {
    const response = await fetch('/api/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok', response);
    }
    return await response.json();
  } catch (error) {
    console.log('[UPDATE_USER_ERROR]', error);
  }
};
