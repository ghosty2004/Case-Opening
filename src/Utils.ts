export default class Utils {
  public static shuffleArray(input: any[]) {
    const newArray = [...input];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }

  public static GenerateRandomItems(inputItems: any[], count: number) {
    const shuffledItems = this.shuffleArray(inputItems);

    const generatedItems = [];
    for (let i = 0; i < count; i++) {
      generatedItems.push(
        shuffledItems[Math.floor(Math.random() * shuffledItems.length)]
      );
    }

    return generatedItems;
  }
}
