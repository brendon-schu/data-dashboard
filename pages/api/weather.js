export default async function handler(req, res) {

    const {latitude, longitude} = req.query;

    // Optionally validate or parse as floats
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ error: "Invalid lat/lon set in Profile." });
    }

	try {
		const response = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
    );

    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    const weather = data.current_weather;

	const formatted_time = new Date("2025-06-04T21:15").toLocaleString(undefined, {
	  weekday: 'long',
	  year: 'numeric',
	  month: 'long',
	  day: 'numeric',
	  hour: 'numeric',
	  minute: '2-digit'
	});
	const [date, time] = formatted_time.split(' at ');

    res.status(200).json({
      city: "Phnom Penh",
      country: "Cambodia",
      temperature: `${weather.temperature}°C`,
      wind: `${weather.windspeed} km/h`,
      date: date,
      time: time
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}

