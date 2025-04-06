import { toast } from "sonner";
import { Character } from "@/components/CharacterDetails";

export const generateSuperheroProfile = async (heroName: string): Promise<Character> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`Generating superhero profile for: ${heroName}`);
    toast.loading(`Creating your superhero profile...`);
    
    // Generate hero data
    const heroData = await generateHeroData(heroName);
    toast.dismiss();
    toast.success(`Superhero profile generated!`);
    
    return heroData;
  } catch (error) {
    console.error("Error generating superhero:", error);
    toast.error("Failed to generate superhero profile");
    
    // Return default superhero if generation fails
    return {
      id: "default-hero",
      name: heroName,
      alterEgo: "Unknown Identity",
      origin: "Origin story unavailable",
      description: `A mysterious superhero known as ${heroName}.`,
      powers: [
        {
          name: "Unknown Power",
          description: "Powers are yet to be discovered",
          level: 5
        }
      ],
      achievements: [
        {
          title: "First Appearance",
          description: "Details unavailable",
          year: new Date().getFullYear()
        }
      ],
      weaknesses: [
        {
          name: "Unknown Weakness",
          description: "Weaknesses are yet to be discovered",
          exploitability: 5
        }
      ],
      allies: ["Unknown"],
      enemies: ["Unknown"],
      baseColor: "#e11d48"
    };
  }
};

// Generate mock superhero data
const generateHeroData = async (heroName: string): Promise<Character> => {
  // Simple superhero profile generation
  return {
    id: `hero-${Date.now()}`,
    name: heroName,
    alterEgo: `${heroName}'s Secret Identity`,
    origin: `Born with extraordinary abilities, ${heroName} decided to use their powers for good.`,
    description: `${heroName} is a powerful Superhero who protects the innocent and fights against evil.`,
    powers: [
      {
        name: "Super Strength",
        description: "Ability to lift objects many times their own weight",
        level: 8
      },
      {
        name: "Enhanced Speed",
        description: "Move at velocities beyond human capability",
        level: 7
      },
      {
        name: "Flight",
        description: "Ability to defy gravity and fly",
        level: 9
      }
    ],
    achievements: [
      {
        title: "City Savior",
        description: `Saved the City from destruction`,
        year: new Date().getFullYear() - 1
      },
      {
        title: "Nemesis Defeat",
        description: "Defeated their Arch-Nemesis in an epic battle",
        year: new Date().getFullYear()
      }
    ],
    weaknesses: [
      {
        name: "Vulnerability",
        description: "Has a specific Vulnerability that can diminish powers",
        exploitability: 6
      },
      {
        name: "Emotional Attachment",
        description: "Strong Emotional Attachments that can be exploited",
        exploitability: 7
      }
    ],
    allies: ["The Defenders", "Justice League", "Young Heroes"],
    enemies: ["Dark Lord", "Mastermind", "The Destroyer"],
    baseColor: "#e11d48"
  };
};

export default generateSuperheroProfile;
