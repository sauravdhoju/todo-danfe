
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header() {
    return (
        <Navbar className="bg-light py-3">
            <Container className="d-flex justify-content-center">
                <p className="mb-0 fst-italic text-center">
                    "Success is the sum of small efforts, repeated daily."
                </p>
            </Container>
        </Navbar>
    );
}

export default Header;
