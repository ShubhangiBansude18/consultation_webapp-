const fetchDataAndProcess = async (url, key) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Count occurrences of each category
    const categoryCounts = {};
    data.forEach((item) => {
      const category = item[key];
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Convert categoryCounts object to an array of objects with x and y properties
    const extractedData = Object.entries(categoryCounts).map(
      ([category, count]) => ({
        x: category,
        y: count,
      })
    );

    return extractedData;
  } catch (error) {
    console.error(`Error fetching ${key} data:`, error);
    return [];
  }
};

export default fetchDataAndProcess;
