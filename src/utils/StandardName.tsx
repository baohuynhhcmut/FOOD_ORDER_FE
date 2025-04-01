
export function capitalizeKeywords(str:string) {
    return str
      .toLowerCase() // chuyển hết về chữ thường
      .split(" ") // tách các từ
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // viết hoa chữ đầu
      .join(" "); // gộp lại
}

export function moveFirstKeywordToLast(str:string) {
    let words = str.trim().split(/\s+/); 
    if (words.length <= 1) return str; 
  
    let first:string = words.shift() as string; 
    words.push(first); 
  
    return words.join(" ");
}
  
