import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function Show(props) {
    const { beca, auth } = props;
    const becasField = [
        { label: "Institución", value: beca.institution },
        { label: "Nombre", value: beca.name },
        { label: "Resumen", value: beca.summary },
        { label: "Tipo de Beca", value: beca.type },
        { label: "Obligatoriedad", value: beca.obligation },
        { label: "Presupuesto", value: beca.budget },
        { label: "País", value: beca.country.name },
        { label: "Región", value: beca.country.name },
        { label: "Fecha de Inicio", value: beca.start_date },
        { label: "Fecha de Fin", value: beca.end_date },
        {
            label: "OCDE",
            value: beca.ocde.map((item) => item.code).join(", "),
        },
        {
            label: "ODS",
            value: beca.ods.map((item) => item.name).join(", "),
        },
        {
            label: "Estado",
            value: beca.status === 1 ? "Vigente" : "No Vigente",
        },
        { label: "Ir al sitio", name: "link", value: beca.link },
        {
            label: "Archivo",
            name: "file_path",
            value: beca.file_path,
        },
        { label: "Creación del registro", value: beca.created_at },
        { label: "Otros", value: beca.others },
        
    ];


    const handleDelete = async (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/becas/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Registro Eliminado",
                            text: "Se elimino el registro",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        return Swal.fire({
                            icon: "Error",
                            title: "Oops...",
                            text: "Algo salió mal",
                        });
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Informacion del Beca
                </h2>
            }
        >
            <Head title="Info Beca" />
            <div className="py-6 mx-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {becasField.map((field, i) => (
                            <div key={i}>
                                <h2 className="text-lg font-medium text-gray-900">
                                    {field.label}
                                </h2>
                                {field.name === "file_path" && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        <a
                                            href={field.value}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            Descargar
                                        </a>
                                    </p>
                                )}
                                {field.name === "link" ? (
                                    <a
                                        href={field.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 text-sm text-blue-500"
                                    >
                                        {field.label}
                                    </a>
                                ) : Array.isArray(field.value) ? (
                                    <ul className="mt-1 text-sm text-gray-600">
                                        {field.value.map((item) => (
                                            <li key={item.id}>
                                                {item.name || item.description}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    field.name !== "file_path" && (
                                        <p className="mt-1 text-sm text-gray-600">
                                            {field.value}
                                        </p>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    {auth.user.role_id == 1&& (
                        <button
                            onClick={() => handleDelete(beca.id)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
