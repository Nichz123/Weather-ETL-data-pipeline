import './table.css'

export default function Table() {
    return(
        <table>
            <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="city">N/A</td>
                    <td id="temperature">N/A</td>
                    <td id="description">N/A</td>
                </tr>
            </tbody>
        </table>
    )
}