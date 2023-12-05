export default async function getArt(): Promise<any> {
    const api = process.env.NEXT_PUBLIC_API_URL;

    return await fetch(`${api}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        return data.json().then((res) => {
            return res;
        });
    }).catch((error) => {
        throw new Error();
    });
}