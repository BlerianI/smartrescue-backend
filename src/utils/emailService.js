export const sendLoginNotification = async ({ lastName, accessTime, accessLocation }) => {
  const formattedTime = new Date(accessTime).toLocaleString('de-AT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_26b7q3w',
        template_id: 'template_uu391m6',
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          last_name: lastName,
          access_time: formattedTime,
          access_location: accessLocation,
        },
      }),
    });

    if (!response.ok) {
      console.error('EmailJS Fehler:', await response.text());
    }
  } catch (err) {
    console.error('EmailJS konnte nicht gesendet werden:', err.message);
  }
};
