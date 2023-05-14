export function greetByTime() {
    const currentTime = new Date().getHours();
  
    if (currentTime >= 1 && currentTime < 12) {
      return("Good morning,");
    } else if (currentTime >= 12 && currentTime < 17) {
      return("Good afternoon,");
    } else {
      return("Good evening,");
    }
}