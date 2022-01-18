import '../assets/Footer.css';

export default function Footer() {
    let today = new Date();
    const footerText = `La Aldeana - ${today.getFullYear()}`;

    return (
        <div className="footer-container">
            <p className="text-white">
                &copy; {footerText}
            </p>
        </div>
    );
}