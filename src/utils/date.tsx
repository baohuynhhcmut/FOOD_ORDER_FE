
export const formatDate = (data:Date) => {
    const date = new Date(data)
    const day = date.getDate() < 10 ? `0${ date.getDate()}` :  date.getDate()
    const month = date.getMonth() < 10 ? `0${ date.getMonth()+1}` :  date.getMonth()+1
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
}

export const  formattedDate = (data:string) => {
    const date = new Date(data)
    const fomatrted = date.toLocaleString('vi-VN', {
        weekday: 'long', // Hiển thị thứ trong tuần
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit', // Hiển thị giờ (2 chữ số)
        minute: '2-digit', // Hiển thị phút (2 chữ số)
        hour12: false // Hiển thị giờ theo định dạng 24h
    })
    return fomatrted
}