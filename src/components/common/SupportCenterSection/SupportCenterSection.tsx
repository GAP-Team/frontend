"use client";
import Image from 'next/image';
import { Box, Grid, Typography, Link } from '@mui/material';

const SupportCenterSection = (): JSX.Element => {
    return (
        <Box sx={{ px: { xs: 2, md: 8 }, py: 6 }}>
            <Typography variant="subtitle1" sx={{ color: 'teal', fontWeight: 600 }}>
                Unsere Kontaktkanäle
            </Typography>
    
            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mt: 1, mb: 4 }}
            >
                Bei Fragen zu immocloud<br />
                helfen wir Dir gerne weiter!
            </Typography>
    
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>E-Mail</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Schreib uns eine E-Mail an:<br />
                            <Link href="mailto:info@immocloud.de" underline="hover">
                                info@immocloud.de
                            </Link>
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Webinare</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Wir bieten Dir kostenfreie Webinare an. Unsere immocloud Experten zeigen Dir
                            in 30 Minuten alles, was Du zu immocloud wissen musst:<br />
                            <Link href="#" underline="hover">
                                Mehr zu den Webinaren
                            </Link>
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Telefon</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Ruf uns montags bis freitags von 9 bis 17 Uhr an:<br />
                            <Link href="tel:021197537490" underline="hover">
                                0211 / 975 374 90
                            </Link>
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>WhatsApp</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Schreib uns per WhatsApp unter:<br />
                            <Link href="https://wa.me/4915792396242" underline="hover" target="_blank" rel="noopener">
                                0157 92396242
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
        
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Box
                        sx={styles.imageHolder}
                    >
                        <Image
                            width={500}
                            height={350}
                            alt="Team smiling"
                            src="/images/hero6.jpg"
                            style={styles.image as React.CSSProperties}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupportCenterSection;

const styles = {
    imageHolder: {
        mx: 'auto',
        maxWidth: 500,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        objectFit: 'cover', 
        borderRadius: '16px', 
    }
}