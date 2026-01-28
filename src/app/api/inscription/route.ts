import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true pour 465, false pour autres ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Template HTML pour l'email
function generateEmailHTML(data: Record<string, any>, files: string[]) {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle inscription Solidatech</title>
</head>
<body style="font-family: 'Montserrat', Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
    <div style="max-width: 650px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #D10074 0%, #a80060 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📋 Nouvelle Inscription Solidatech</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Association LÉA</p>
        </div>
        
        <!-- Contenu -->
        <div style="padding: 30px;">
            
            <!-- Section Structure -->
            <div style="margin-bottom: 25px;">
                <h2 style="color: #D10074; font-size: 18px; border-bottom: 2px solid #FFB400; padding-bottom: 8px; margin-bottom: 15px;">
                    🏢 Informations de la structure
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600; width: 40%;">Nom de la structure</td>
                        <td style="padding: 8px 0; color: #333;">${data.nomStructure || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Email</td>
                        <td style="padding: 8px; color: #333;">${data.email || "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600;">Téléphone</td>
                        <td style="padding: 8px 0; color: #333;">${data.telephone || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Adresse</td>
                        <td style="padding: 8px; color: #333;">${data.adressePostale || "-"}${data.complementAdresse ? `, ${data.complementAdresse}` : ""}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600;">Code postal / Ville</td>
                        <td style="padding: 8px 0; color: #333;">${data.codePostal || "-"} ${data.ville || ""}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Région / Pays</td>
                        <td style="padding: 8px; color: #333;">${data.region || "-"} / ${data.pays || "-"}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Section Juridique -->
            <div style="margin-bottom: 25px;">
                <h2 style="color: #D10074; font-size: 18px; border-bottom: 2px solid #FFB400; padding-bottom: 8px; margin-bottom: 15px;">
                    ⚖️ Informations juridiques
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600; width: 40%;">Statut légal</td>
                        <td style="padding: 8px 0; color: #333;">${data.statutLegal || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">SIRET</td>
                        <td style="padding: 8px; color: #333;">${data.siret || "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600;">RNA</td>
                        <td style="padding: 8px 0; color: #333;">${data.rna || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Date d'inscription</td>
                        <td style="padding: 8px; color: #333;">${data.dateInscription || "-"}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Section Activité -->
            <div style="margin-bottom: 25px;">
                <h2 style="color: #D10074; font-size: 18px; border-bottom: 2px solid #FFB400; padding-bottom: 8px; margin-bottom: 15px;">
                    📊 Activité & Impact
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600; width: 40%;">Secteur d'activité</td>
                        <td style="padding: 8px 0; color: #333;">${data.secteurActivite || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Budget annuel</td>
                        <td style="padding: 8px; color: #333;">${data.budgetAnnuel ? `${Number(data.budgetAnnuel).toLocaleString("fr-FR")} €` : "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600;">Nombre de salariés</td>
                        <td style="padding: 8px 0; color: #333;">${data.nombreSalaries || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Nombre de bénévoles</td>
                        <td style="padding: 8px; color: #333;">${data.nombreBenevoles || "-"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #575756; font-weight: 600;">Nombre de bénéficiaires</td>
                        <td style="padding: 8px 0; color: #333;">${data.nombreBeneficiaires || "-"}</td>
                    </tr>
                    <tr style="background: #f9f9f9;">
                        <td style="padding: 8px; color: #575756; font-weight: 600;">Fédération/Réseau</td>
                        <td style="padding: 8px; color: #333;">${data.federationReseau || "-"}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Documents -->
            ${files.length > 0 ? `
            <div style="margin-bottom: 25px;">
                <h2 style="color: #D10074; font-size: 18px; border-bottom: 2px solid #FFB400; padding-bottom: 8px; margin-bottom: 15px;">
                    📎 Documents joints
                </h2>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${files.map(f => `<li style="padding: 8px 0; color: #333;">📄 ${f}</li>`).join("")}
                </ul>
            </div>
            ` : ""}
            
        </div>
        
        <!-- Footer -->
        <div style="background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #575756; margin: 0; font-size: 14px;">
                Ce message a été envoyé automatiquement depuis le formulaire d'inscription Solidatech.
            </p>
            <p style="color: #D10074; margin: 10px 0 0; font-size: 12px;">
                Association LÉA - L'Écoute, l'Accompagnement
            </p>
        </div>
        
    </div>
</body>
</html>
    `;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Extraire les données du formulaire
        const data: Record<string, any> = {};
        const fileNames: string[] = [];
        const attachments: { filename: string; content: Buffer }[] = [];

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                // Traiter les fichiers
                const buffer = Buffer.from(await value.arrayBuffer());
                attachments.push({
                    filename: value.name,
                    content: buffer,
                });
                fileNames.push(value.name);
            } else {
                data[key] = value;
            }
        }

        // Email destinataire (configurable via env)
        const toEmail = process.env.EMAIL_TO || "info@asso-lea.org";
        const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || "noreply@asso-lea.org";

        // Envoi de l'email
        await transporter.sendMail({
            from: `"Formulaire Solidatech" <${fromEmail}>`,
            to: toEmail,
            subject: `📋 Nouvelle inscription Solidatech - ${data.nomStructure || "Association"}`,
            html: generateEmailHTML(data, fileNames),
            attachments: attachments,
        });

        // Envoi d'un email de confirmation à l'expéditeur (optionnel)
        if (data.email) {
            await transporter.sendMail({
                from: `"Association LÉA" <${fromEmail}>`,
                to: data.email,
                subject: "✅ Confirmation - Votre inscription Solidatech a bien été reçue",
                html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #D10074 0%, #a80060 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">✅ Inscription reçue !</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
            <p style="color: #575756; font-size: 16px; line-height: 1.6;">
                Bonjour,<br><br>
                Nous avons bien reçu votre demande d'inscription au programme <strong>Solidatech</strong>.
            </p>
            <p style="color: #575756; font-size: 16px; line-height: 1.6;">
                Notre équipe va traiter votre dossier et vous recontactera dans les plus brefs délais.
            </p>
            <div style="margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 12px;">
                <p style="color: #D10074; font-weight: bold; margin: 0;">Association LÉA</p>
                <p style="color: #575756; margin: 5px 0 0; font-size: 14px;">L'Écoute, l'Accompagnement</p>
            </div>
        </div>
    </div>
</body>
</html>
                `,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Inscription envoyée avec succès"
        });

    } catch (error) {
        console.error("Erreur lors de l'envoi:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Erreur lors de l'envoi du formulaire",
                error: error instanceof Error ? error.message : "Erreur inconnue"
            },
            { status: 500 }
        );
    }
}
