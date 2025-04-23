export const isStoreOpen = (): boolean => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Convert current time to minutes since midnight
  const currentTimeInMinutes = hours * 60 + minutes;
  
  // Store hours: 07:00 (420 minutes) to 21:30 (1290 minutes)
  return currentTimeInMinutes >= 420 && currentTimeInMinutes <= 1290;
};

export const getDeliveryTimeOptions = (): string[] => {
  const options: string[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Start from current hour + 1 hour for delivery preparation
  let startHour = currentHour + 1;
  
  // If minutes > 30, start from next hour + 1
  if (currentMinute > 30) {
    startHour += 1;
  }
  
  // Cap at closing time (21:30)
  const endHour = 21;
  
  // Generate time slots at 30-minute intervals
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute of [0, 30]) {
      // Skip times that have already passed
      if (hour === startHour && minute === 0 && currentMinute > 30) {
        continue;
      }
      
      // Skip times after 21:30
      if (hour === 21 && minute > 30) {
        continue;
      }
      
      const hourFormatted = hour.toString().padStart(2, '0');
      const minuteFormatted = minute.toString().padStart(2, '0');
      
      options.push(`${hourFormatted}:${minuteFormatted}`);
    }
  }
  
  return options;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
};