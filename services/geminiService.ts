// This service has been disabled as per request.
// The @google/genai dependency has been removed from package.json.

export const generateBikeDescription = async (name: string, specs: string): Promise<string> => {
  console.warn("AI generation is disabled.");
  return "Description not available.";
};