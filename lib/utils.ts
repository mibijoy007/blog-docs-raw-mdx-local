import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatedTitle(title:string){
  const words = title.split('-');
  let finalTitle = '';
  words.map((item) => {

      // console.log(isNaN(Number(item)));

      if(isNaN(Number(item))) {
          let capitalized = item.charAt(0).toUpperCase()+item.slice(1);
          finalTitle += capitalized + ' '
      }
      
  })
  // console.log(finalTitle);
  return finalTitle
}

