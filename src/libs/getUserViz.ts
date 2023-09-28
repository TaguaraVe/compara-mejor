export const getAllUserVizById = async (id: string) => {
  try {
    const response = await fetch('/api/views', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.log('[PUTVIEWS_ERROR]', error);
  }
};
