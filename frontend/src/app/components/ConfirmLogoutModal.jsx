export default function ConfirmLogoutModal({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🚪</div>
        <h3 className="text-2xl font-bold text-[#0d1b0d] dark:text-gray-100 mb-2">
          ¿Cerrar sesión?
        </h3>
        <p className="text-lg text-[#475569] dark:text-gray-400 mb-8">
          ¿Está seguro que desea salir de su cuenta?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl text-lg font-bold bg-[#f3f7f3] dark:bg-gray-700 text-[#0d1b0d] dark:text-gray-200 hover:bg-[#e4ede4] dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl text-lg font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Sí, salir
          </button>
        </div>
      </div>
    </div>
  );
}
