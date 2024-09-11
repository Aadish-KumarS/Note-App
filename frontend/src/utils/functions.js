
export const filter = (filterNotes,data,setNotes) => {
  if(filterNotes){
    console.log('yes')
    const filteredNotes = filterNotes
      ? data.filter(note => 
        note.title.toLowerCase().includes(filterNotes.toLowerCase()) 
        || note.content.toLowerCase().includes(filterNotes.toLowerCase()))
      : data;
    setNotes(filteredNotes);
  }else {
    console.log('yes')
    setNotes(data);
  }
}