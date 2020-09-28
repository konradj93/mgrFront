import * as React from 'react';

const List = () => {
    return <div>
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Tags</th>
                <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row"><input type={'checkbox'}/></th>
                <td>Mark</td>
                <td>El Bagieta</td>
                <td>@mdo</td>
                <td>2020</td>
            </tr>
            <tr>
                <th scope="row"><input type={'checkbox'}/></th>
                <td>Jacob</td>
                <td>El Bagieta</td>
                <td>@fat</td>
                <td>2020</td>
            </tr>
            <tr>
                <th scope="row"><input type={'checkbox'}/></th>
                <td>Larry</td>
                <td>El Bagieta</td>
                <td>@twitter</td>
                <td>2020</td>
            </tr>
            </tbody>
        </table>

    </div>
};

export default List;
