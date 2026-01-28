"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    CheckCircle2,
    Upload,
    X,
    FileText,
    Building2,
    Scale,
    Activity,
    FolderOpen,
    Sparkles,
    Heart,
    Send,
    ChevronRight,
} from "lucide-react";

// Schéma de validation Zod
const formSchema = z.object({
    nomStructure: z.string().min(1, "Champ obligatoire"),
    email: z.string().email("Email invalide"),
    telephone: z.string().min(1, "Champ obligatoire"),
    adressePostale: z.string().min(1, "Champ obligatoire"),
    complementAdresse: z.string().optional(),
    codePostal: z.string().min(1, "Champ obligatoire"),
    ville: z.string().min(1, "Champ obligatoire"),
    region: z.string().min(1, "Champ obligatoire"),
    pays: z.string().min(1, "Champ obligatoire"),
    statutLegal: z.string().min(1, "Champ obligatoire"),
    siret: z.string().optional(),
    rna: z.string().min(1, "Champ obligatoire"),
    dateInscription: z.string().min(1, "Champ obligatoire"),
    secteurActivite: z.string().min(1, "Champ obligatoire"),
    budgetAnnuel: z.string().min(1, "Champ obligatoire"),
    nombreSalaries: z.string().min(1, "Champ obligatoire"),
    nombreBenevoles: z.string().min(1, "Champ obligatoire"),
    nombreBeneficiaires: z.string().min(1, "Champ obligatoire"),
    federationReseau: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
    nomStructure: "Association LÉA",
    email: "info@asso-lea.org",
    telephone: "0 805 950 874",
    adressePostale: "46 rue Antoine Lombard",
    complementAdresse: "",
    codePostal: "83300",
    ville: "Draguignan",
    region: "PACA",
    pays: "France",
    statutLegal: "Association (Loi 1901)",
    siret: "813 065 398 00147",
    rna: "W831003504",
    dateInscription: "2012-12-11",
    secteurActivite: "Santé / Action Sociale / Handicap",
    budgetAnnuel: "",
    nombreSalaries: "8",
    nombreBenevoles: "100",
    nombreBeneficiaires: "45 000",
    federationReseau: "",
};

const secteursActivite = [
    "Santé / Action Sociale / Handicap",
    "Éducation / Formation",
    "Culture / Arts",
    "Sport / Loisirs",
    "Environnement",
    "Solidarité internationale",
    "Insertion professionnelle",
    "Autre",
];

// Confettis améliorés avec formes variées
function Confetti() {
    const colors = ["#D10074", "#FFB400", "#FF6B9D", "#FFC94D", "#ffffff"];
    const shapes = ["circle", "square", "star"];
    const confettis = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotationSpeed: Math.random() * 720 - 360,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confettis.map((c) => (
                <motion.div
                    key={c.id}
                    initial={{ y: -50, x: `${c.x}vw`, opacity: 1, rotate: 0, scale: 0 }}
                    animate={{
                        y: "110vh",
                        rotate: c.rotationSpeed,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        delay: c.delay,
                        ease: [0.23, 0.75, 0.5, 1],
                    }}
                    style={{
                        position: "absolute",
                        width: c.size,
                        height: c.size,
                        backgroundColor: c.color,
                        borderRadius: c.shape === "circle" ? "50%" : c.shape === "star" ? "2px" : "0",
                        boxShadow: `0 0 ${c.size / 2}px ${c.color}40`,
                    }}
                />
            ))}
        </div>
    );
}

// Particules flottantes en arrière-plan
function FloatingParticles() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                        width: 100 + i * 50,
                        height: 100 + i * 50,
                        background: i % 2 === 0
                            ? "radial-gradient(circle, #D10074 0%, transparent 70%)"
                            : "radial-gradient(circle, #FFB400 0%, transparent 70%)",
                        left: `${10 + i * 15}%`,
                        top: `${5 + i * 12}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}
        </div>
    );
}

// Input avec animation et icône
function FormInput({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
    register,
    error,
    icon: Icon,
}: {
    label: string;
    name: keyof FormData;
    type?: string;
    required?: boolean;
    placeholder?: string;
    register: any;
    error?: string;
    icon?: any;
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            className="mb-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <label className="block text-sm font-semibold text-lea-gray mb-2 flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4 text-lea-pink/60" />}
                {label} {required && <span className="text-lea-pink animate-pulse">*</span>}
            </label>
            <div className="relative group">
                <input
                    type={type}
                    {...register(name)}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none
                        bg-white/80 backdrop-blur-sm
                        hover:bg-white hover:shadow-md hover:shadow-lea-pink/5
                        focus:bg-white focus:shadow-lg focus:shadow-lea-pink/10
                        ${isFocused ? "border-lea-pink ring-4 ring-lea-pink/10" : "border-gray-200/80"}
                        ${error ? "border-red-400 ring-2 ring-red-100" : ""}
                        placeholder:text-gray-400
                    `}
                />
                <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-lea-pink to-lea-yellow rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{ width: isFocused ? "100%" : 0, x: "-50%" }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    >
                        <X className="w-3 h-3" /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Select avec style moderne
function FormSelect({
    label,
    name,
    required = false,
    options,
    register,
    error,
}: {
    label: string;
    name: keyof FormData;
    required?: boolean;
    options: string[];
    register: any;
    error?: string;
}) {
    return (
        <motion.div
            className="mb-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <label className="block text-sm font-semibold text-lea-gray mb-2">
                {label} {required && <span className="text-lea-pink animate-pulse">*</span>}
            </label>
            <div className="relative">
                <select
                    {...register(name)}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none 
                        bg-white/80 backdrop-blur-sm appearance-none cursor-pointer
                        hover:bg-white hover:shadow-md hover:shadow-lea-pink/5 hover:border-lea-pink/50
                        focus:bg-white focus:border-lea-pink focus:ring-4 focus:ring-lea-pink/10 focus:shadow-lg
                        ${error ? "border-red-400" : "border-gray-200/80"}
                    `}
                >
                    <option value="">Choisissez un secteur d&apos;activité</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-lea-gray/40 rotate-90 pointer-events-none" />
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </motion.div>
    );
}

// Section avec glassmorphism et animation
function FormSection({
    icon: Icon,
    title,
    children,
    delay = 0,
}: {
    icon: any;
    title: string;
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -2 }}
            className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 mb-6 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50
                hover:shadow-[0_20px_50px_rgb(209,0,116,0.08)] transition-all duration-500"
        >
            {/* Accent gradient line */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-lea-pink via-lea-yellow to-lea-pink rounded-full opacity-60" />

            <div className="flex items-center gap-4 mb-8 pt-2">
                <motion.div
                    className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-lea-pink to-lea-pink/70 flex items-center justify-center shadow-lg shadow-lea-pink/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <Icon className="w-6 h-6 text-white" />
                    <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                </motion.div>
                <div>
                    <h2 className="text-xl font-bold text-lea-gray">{title}</h2>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-lea-yellow to-transparent rounded-full mt-1" />
                </div>
            </div>
            {children}
        </motion.div>
    );
}

export default function InscriptionSolidatech() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === "application/pdf" && file.size <= 1024 * 1024
        );
        setFiles((prev) => [...prev, ...droppedFiles]);
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(
                (file) => file.type === "application/pdf" && file.size <= 1024 * 1024
            );
            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            // Créer FormData pour envoyer fichiers + données
            const formDataToSend = new FormData();

            // Ajouter toutes les données du formulaire
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formDataToSend.append(key, String(value));
                }
            });

            // Ajouter les fichiers PDF
            files.forEach((file) => {
                formDataToSend.append("documents", file);
            });

            // Envoi à l'API
            const response = await fetch("/api/inscription", {
                method: "POST",
                body: formDataToSend,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Erreur lors de l'envoi");
            }

            setIsSuccess(true);
        } catch (error) {
            console.error("Erreur:", error);
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue lors de l'envoi"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
            <FloatingParticles />
            <AnimatePresence>{isSuccess && <Confetti />}</AnimatePresence>

            {/* Header moderne avec glassmorphism */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4"
                        >
                            <Image
                                src="/logo.png"
                                alt="Association LÉA"
                                width={140}
                                height={50}
                                className="h-auto"
                                priority
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden md:flex items-center gap-2 text-sm text-lea-gray/70"
                        >
                            <Heart className="w-4 h-4 text-lea-pink" />
                            <span>L&apos;Écoute, l&apos;Accompagnement</span>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="relative z-10 max-w-5xl mx-auto px-4 py-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-lea-pink/10 to-lea-yellow/10 
                            text-lea-pink px-5 py-2.5 rounded-full text-sm font-semibold mb-6 
                            border border-lea-pink/20 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="w-4 h-4" />
                        Programme Solidatech
                        <Sparkles className="w-4 h-4" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-lea-gray via-lea-gray to-lea-gray/80 bg-clip-text text-transparent">
                            Inscrivez-vous à
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-lea-pink via-lea-pink to-lea-yellow bg-clip-text text-transparent">
                            Solidatech
                        </span>
                    </h1>

                    <p className="text-lg text-lea-gray/70 max-w-2xl mx-auto mb-6 leading-relaxed">
                        Bénéficiez d&apos;offres solidaires et montez en compétences sur le numérique.
                        Inscription rapide en <strong className="text-lea-pink">10 minutes</strong>.
                    </p>

                    <motion.div
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-lea-yellow/20 to-lea-yellow/10 
                            px-6 py-3 rounded-2xl border border-lea-yellow/30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <FileText className="w-5 h-5 text-lea-yellow" />
                        <span className="text-sm text-lea-gray/80">
                            Munissez-vous de vos documents (statuts, SIRET/RNA)
                        </span>
                    </motion.div>
                </motion.div>

                {/* Modal de succès */}
                <AnimatePresence>
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                                transition={{ type: "spring", damping: 20 }}
                                className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-10 text-center max-w-md w-full 
                                    shadow-2xl shadow-lea-pink/20 border border-white/50"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-green-400 to-emerald-500 
                                        rounded-3xl flex items-center justify-center shadow-xl shadow-green-200/50"
                                >
                                    <CheckCircle2 className="w-14 h-14 text-white" />
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-bold text-lea-gray mb-4"
                                >
                                    🎉 Dossier transmis !
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lea-gray/70 mb-8"
                                >
                                    Votre inscription Solidatech a bien été envoyée.
                                    Vous recevrez une confirmation par email.
                                </motion.p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsSuccess(false)}
                                    className="px-8 py-4 bg-gradient-to-r from-lea-pink to-lea-pink/90 text-white 
                                        rounded-2xl font-semibold shadow-lg shadow-lea-pink/30
                                        hover:shadow-xl hover:shadow-lea-pink/40 transition-all duration-300"
                                >
                                    Fermer
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Formulaire */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Section Structure */}
                    <FormSection icon={Building2} title="Informations de la structure" delay={0.1}>
                        <div className="grid md:grid-cols-2 gap-x-8">
                            <FormInput label="Nom de la structure" name="nomStructure" required register={register} error={errors.nomStructure?.message} />
                            <FormInput label="Adresse mail" name="email" type="email" required register={register} error={errors.email?.message} />
                            <FormInput label="Téléphone" name="telephone" type="tel" required register={register} error={errors.telephone?.message} />
                            <FormInput label="Adresse postale" name="adressePostale" required register={register} error={errors.adressePostale?.message} />
                            <FormInput label="Complément d'adresse" name="complementAdresse" register={register} />
                            <FormInput label="Code postal" name="codePostal" required register={register} error={errors.codePostal?.message} />
                            <FormInput label="Ville" name="ville" required register={register} error={errors.ville?.message} />
                            <FormInput label="Région" name="region" required register={register} error={errors.region?.message} />
                            <FormInput label="Pays" name="pays" required register={register} error={errors.pays?.message} />
                        </div>
                    </FormSection>

                    {/* Section Juridique */}
                    <FormSection icon={Scale} title="Informations juridiques" delay={0.2}>
                        <div className="grid md:grid-cols-2 gap-x-8">
                            <FormInput label="Statut légal de la structure" name="statutLegal" required register={register} error={errors.statutLegal?.message} />
                            <FormInput label="SIRET" name="siret" register={register} />
                            <FormInput label="RNA" name="rna" required register={register} error={errors.rna?.message} />
                            <FormInput label="Date d'inscription au programme" name="dateInscription" type="date" required register={register} error={errors.dateInscription?.message} />
                        </div>
                    </FormSection>

                    {/* Section Activité */}
                    <FormSection icon={Activity} title="Activité & Impact" delay={0.3}>
                        <div className="grid md:grid-cols-2 gap-x-8">
                            <FormSelect label="Secteur d'activité" name="secteurActivite" required options={secteursActivite} register={register} error={errors.secteurActivite?.message} />
                            <FormInput label="Budget annuel de fonctionnement (€)" name="budgetAnnuel" type="number" required placeholder="Ex: 150000" register={register} error={errors.budgetAnnuel?.message} />
                            <FormInput label="Nombre de salariés" name="nombreSalaries" type="number" required register={register} error={errors.nombreSalaries?.message} />
                            <FormInput label="Nombre de bénévoles" name="nombreBenevoles" type="number" required register={register} error={errors.nombreBenevoles?.message} />
                            <FormInput label="Nombre de bénéficiaires" name="nombreBeneficiaires" required register={register} error={errors.nombreBeneficiaires?.message} />
                            <FormInput label="Fédération/Réseau" name="federationReseau" register={register} />
                        </div>
                    </FormSection>

                    {/* Section Documents */}
                    <FormSection icon={FolderOpen} title="Documents" delay={0.4}>
                        <p className="text-sm text-lea-gray/70 mb-6">
                            Téléversez vos documents officiels (Statuts, publication au Journal Officiel, etc.)
                        </p>

                        <motion.div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            whileHover={{ scale: 1.01 }}
                            className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer
                                ${isDragOver
                                    ? "border-lea-pink bg-gradient-to-br from-lea-pink/5 to-lea-yellow/5 shadow-lg shadow-lea-pink/10"
                                    : "border-gray-300/80 hover:border-lea-pink/50 hover:bg-gray-50/50"
                                }
                            `}
                        >
                            <input
                                type="file"
                                accept=".pdf"
                                multiple
                                onChange={handleFileSelect}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <motion.div
                                animate={{ y: isDragOver ? -5 : 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors
                                    ${isDragOver ? "bg-lea-pink/10" : "bg-gray-100"}`}>
                                    <Upload className={`w-8 h-8 ${isDragOver ? "text-lea-pink" : "text-gray-400"}`} />
                                </div>
                                <p className="text-lea-gray font-semibold mb-2">
                                    Cliquez pour sélectionner ou glissez-déposez
                                </p>
                                <p className="text-sm text-gray-500">
                                    PDF uniquement (max. 1 Mo par fichier)
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Liste des fichiers */}
                        <AnimatePresence>
                            {files.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 space-y-3"
                                >
                                    {files.map((file, index) => (
                                        <motion.div
                                            key={`${file.name}-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white 
                                                rounded-xl px-5 py-4 border border-gray-100 shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-lea-pink/10 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-lea-pink" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-lea-gray truncate max-w-[200px] md:max-w-none block">
                                                        {file.name}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {(file.size / 1024).toFixed(1)} Ko
                                                    </span>
                                                </div>
                                            </div>
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFile(index)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                            >
                                                <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                                            </motion.button>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </FormSection>

                    {/* Note champs obligatoires */}
                    <p className="text-sm text-lea-gray/60 text-center">
                        <span className="text-lea-pink">*</span> Champ obligatoire
                    </p>

                    {/* Bouton de soumission spectaculaire */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pt-4"
                    >
                        {/* Message d'erreur */}
                        <AnimatePresence>
                            {errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center"
                                >
                                    <p className="font-medium">❌ {errorMessage}</p>
                                    <p className="text-sm mt-1 text-red-500">
                                        Vérifiez votre connexion ou réessayez plus tard.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`relative w-full py-5 rounded-2xl font-bold text-lg text-white overflow-hidden
                                transition-all duration-300 group
                                ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-lea-pink via-lea-pink to-lea-pink/90 shadow-xl shadow-lea-pink/30 hover:shadow-2xl hover:shadow-lea-pink/40"
                                }
                            `}
                        >
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-3">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                                    />
                                    Envoi en cours...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-3">
                                    <Send className="w-5 h-5" />
                                    Soumettre mon inscription
                                </span>
                            )}
                        </motion.button>
                    </motion.div>
                </form>

                {/* Footer élégant */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center pb-10"
                >
                    <div className="inline-flex items-center gap-2 text-lea-gray/50 text-sm">
                        <Heart className="w-4 h-4 text-lea-pink/50" />
                        <span>© {new Date().getFullYear()} Association LÉA</span>
                        <span className="mx-2">•</span>
                        <span>L&apos;Écoute, l&apos;Accompagnement</span>
                    </div>
                </motion.footer>
            </main>
        </div>
    );
}
