
export function pickWord(wordlist) {
  //let index = random.randint(0, wordlist.length-1) 
  const index = Math.floor(Math.random() * wordlist.length)
  return wordlist[index]
}

