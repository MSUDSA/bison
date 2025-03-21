export async function getAllDirectMessages() {
    const res = await fetch('http://localhost:8000/messages/', {credentials: 'include'})
    return await res.json()
}

export async function createNewDm(title: string) {
    const res = await fetch('http://localhost:8000/messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({title})
    })
    return await res.json()
}