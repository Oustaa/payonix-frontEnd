export function getTarget(data, id, id_name) {
  return new Promise(function (resolve, reject) {
    const target = data.find((target) => target[id_name] === id);

    if (target) resolve(target);
    reject(new Error(`could not find target with the id ${id}`));
  });
}
