
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result is in the format "data:image/jpeg;base64,LzlqLzRBQ...".
      // We only need the part after the comma.
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};
