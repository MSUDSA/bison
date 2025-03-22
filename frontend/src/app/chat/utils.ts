export async function getAllDirectMessages() {
    const res = await fetch('https://projectspace.tech/messages/', {credentials: 'include', })
    console.log(res)
    return await res.json()
}

export async function createNewDm(title: string) {
    const res = await fetch('https://projectspace.tech/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({title})
    })
    
    return await res.json()
}

export async function getDmMessages(dm_id: number) {
    const res = await fetch(`https://projectspace/messages/message/${dm_id}`, {credentials: 'include'});
    return await res.json()
}