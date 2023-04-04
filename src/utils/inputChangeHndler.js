export default function changeHandler(e, cb) {
  const name = e.target.name;

  cb((prev) => {
    return {
      ...prev,
      [name]: { ...prev[name], value: e.target.value, valid: true },
    };
  });
}
