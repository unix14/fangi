const FEAR_GREED_API_URL = 'https://fear-and-greed-index.p.rapidapi.com/v1/fgi';

export const fetchFearGreedIndex = async () => {
  try {
    console.log('Fetching Fear & Greed Index data...');
    const response = await fetch(FEAR_GREED_API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'fear-and-greed-index.p.rapidapi.com',
        'x-rapidapi-key': localStorage.getItem('RAPID_API_KEY') || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Fear & Greed Index');
    }

    const data = await response.json();
    console.log('Fear & Greed Index data:', data);
    return data.fgi.now;
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error);
    return null;
  }
};