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
