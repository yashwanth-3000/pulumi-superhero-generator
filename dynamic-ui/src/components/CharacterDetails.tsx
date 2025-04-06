// Character data types
export interface Power {
  name: string;
  description: string;
  level: number; // 1-10 scale
}

export interface Achievement {
  title: string;
  description: string;
  year?: number;
}

export interface Weakness {
  name: string;
  description: string;
  exploitability: number; // 1-10 scale
}

export interface Character {
  id: string;
  name: string;
  alterEgo: string;
  origin: string;
  description: string;
  firstAppearance?: string;
  powers: Power[];
  achievements: Achievement[];
  weaknesses: Weakness[];
  allies: string[];
  enemies: string[];
  baseColor: string;
}

/**
 * Get character details based on the character name
 */
export const getCharacterDetails = (characterName: string): Character => {
  // Default character template
  return {
    id: "custom-hero",
    name: characterName || "Custom Hero",
    alterEgo: "Secret Identity",
    origin: "Origins unknown, to be generated from user input",
    description: "A completely custom superhero with powers and abilities defined by your input.",
    powers: [
      {
        name: "Custom Power",
        description: "This power will be defined based on your input",
        level: 8
      }
    ],
    achievements: [
      {
        title: "First Appearance",
        description: "The first heroic deed of this character",
        year: new Date().getFullYear()
      }
    ],
    weaknesses: [
      {
        name: "Unknown Weakness",
        description: "Every hero has a weakness, this one will be defined by your input",
        exploitability: 5
      }
    ],
    allies: ["To be generated"],
    enemies: ["To be generated"],
    baseColor: "#e11d48"
  };
};

export default getCharacterDetails; 