'use client'
// import material ui components
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
// import components
import { LinearProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Subheader } from '../components/subheader';

export default function FAQ() {
    const { data: session, status } = useSession();
    if (status === "loading") return <LinearProgress />
    return (
        <>
        <Header />
        <Subheader />
        <section className="bg-white p-8">
            <h2 className="text-3xl font-bold mb-6 font-eb_garamond">Frequently Asked Questions (FAQ)</h2>

            <div className="space-y-4">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>1. What types of books do you sell?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We offer a wide range of books across various genres, including fiction, non-fiction, mystery, fantasy, romance, science fiction, and more. Whether you're looking for bestsellers, classics, or niche topics, we have something for everyone!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>2. How can I place an order?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can place an order directly on our website. Simply browse our collection, add your desired books to your cart, and proceed to checkout. Follow the prompts to complete your order.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>3. Do you offer e-books?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Yes! We have a selection of e-books available for purchase. Once you complete your order, you will receive a link to download your e-book.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel4-content"
                        id="panel4-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>4. What payment methods do you accept?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We accept various payment methods, including debit cards from every bank, major credit cards (Visa, MasterCard), and e-wallets (Momo, ZaloPay...).
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>5. Can I modify or cancel my order?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            If you need to modify or cancel your order, please contact our customer service as soon as possible. Once an order is processed and shipped, we are unable to make changes.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel6-content"
                        id="panel6-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>6. How long will it take to receive my order?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Delivery times vary based on your location and the shipping method selected at checkout. Generally, orders are processed within 1-3 business days, and standard shipping takes an additional 3-7 business days.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel7-content"
                        id="panel7-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>7. Do you offer international shipping?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            No, at the time we don't offer international shipping to select countries.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel8-content"
                        id="panel8-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>8. What is your return policy?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We accept returns within 30 days of purchase. To be eligible for a return, the book must be in its original condition. Please contact our customer service for return instructions.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel9-content"
                        id="panel9-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>9. How can I contact customer service?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can reach our customer service team via email at bookstoreHaven.sdc@gmail.com or by using the contact form on our website. We're here to help!
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel10-content"
                        id="panel10-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>10. Can I request a specific book or author?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Absolutely! If there's a specific book or author you're interested in, please let us know, and we’ll do our best to source it for you.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel11-content"
                        id="panel11-header"
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>11. How can I stay updated on new arrivals and promotions?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            To stay informed about new releases, promotions, and events, subscribe to our newsletter. You can sign up at the bottom of our homepage.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </section>
        <Footer />
        </>
    );
}
