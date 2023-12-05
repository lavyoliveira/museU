import { IReport } from '../interfaces/IReport';

export default async function getReport(report: IReport): Promise<any> {
    const api = process.env.NEXT_PUBLIC_API_URL;

    return await fetch(`${api}/report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
    }).then((data) => {
        return data.json().then((res) => {
            return res;
        });
    }).catch((error) => {
        throw new Error();
    });
}