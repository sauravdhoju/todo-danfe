import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Footer() {
    return (
        <Navbar bg="light" variant="dark" fixed="bottom" className="py-3">
            <Container className="d-flex justify-content-center">
                <p className="mb-0 fst-italic text-center text-black">
                    WHo developer? © {new Date().getFullYear()}
                </p>
            </Container>
        </Navbar>
    );
}

export default Footer;
