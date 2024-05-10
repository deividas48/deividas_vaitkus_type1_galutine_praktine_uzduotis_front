export default function Submit() {
  return (
    <div className="flex justify-center">
      <div className="flex w-4/5 md:w-2/4 justify-end">
        <button type="submit" aria-label="Submit form">
          <div className="bg-custom-primary-color text-white rounded-md py-2 px-4 transition-all duration-300 ease-in-out hover:bg-custom-color-secondary">
            Add
          </div>
        </button>
      </div>
    </div>
  );
}
