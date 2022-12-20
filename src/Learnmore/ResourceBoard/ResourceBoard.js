import {Table} from "react-bootstrap";

function ResourceBoard()
{
    return (
        <>
            <div className="col-10 mx-auto pt-5">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th className="col-1">번호</th>
                        <th className="col-5">제목</th>
                        <th className="col-1">날짜</th>
                        <th className="col-1">작성자</th>
                    </tr>
                    </thead>
                </Table>
            </div>
        </>
    );
}

export default ResourceBoard;