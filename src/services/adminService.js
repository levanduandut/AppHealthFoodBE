import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import jwt from 'jsonwebtoken';
const fs = require('fs')
require("dotenv").config()
const salt = bcrypt.genSaltSync(10);
const Multer = require("multer");


// const { Storage } = require('@google-cloud/storage');
const path = require("path");
// const multerx = Multer({
//     storage: Multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
//     },
// });
// const storage = new Storage({
//     keyFilename: path.join(__dirname, "../fiery-atlas-388115-cbec4b777bcb.json"),
//     projectId: 'fiery-atlas-388115',
// })
// const buckket = storage.bucket('healthfood-do');

//FoodCa
let createNewFoodCa = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                await db.CategoryFood.create({
                    name: data.name,
                    detail: data.detail,
                });
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
            else {
                resolve({
                    errCode: 0,
                    message: "Missing Data !",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteFoodCa = (idFoodCa) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foodCa = await db.CategoryFood.findOne({ where: { id: idFoodCa } });
            if (!foodCa) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    foodCa,
                });
            }
            await db.CategoryFood.destroy({
                where: { id: idFoodCa },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                foodCa,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateFoodCaData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Không có id CategoryFood",
                    data,
                });
            } else {
                let foodCa = await db.CategoryFood.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (foodCa) {
                    foodCa.name = data.name,
                        foodCa.detail = data.detail,
                        await foodCa.save();
                    resolve({
                        errCode: 0,
                        message: "Da sua",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "Khong sua dc ",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

//Food
// let createNewFood = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log(data);
//             if (req.file) {
//                 try {
//                     if (req.file) {
//                         const blob = buckket.file(req.file.originalname);
//                         const blobStream = blob.createWriteStream();
//                         await blobStream.on('finish', () => {
//                         })
//                         blobStream.end(req.file.buffer);
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 await db.Food.create({
//                     name: data.name,
//                     detail: data.detail,
//                     tag: data.tag,
//                     categoryId: data.categoryId,
//                     sickId: data.sickId,
//                     sickId1: data.sickId1,
//                     sickId2: data.sickId2,
//                     time: data.time,
//                     star: data.star,
//                     calo: data.calo,
//                     image: req.file.originalname,
//                 });
//                 resolve({
//                     errCode: 0,
//                     message: "Lưu thành công !",
//                 });
//             }
//             else {
//                 await db.Food.create({
//                     name: data.name,
//                     detail: data.detail,
//                     tag: data.tag,
//                     categoryId: data.categoryId,
//                     sickId: data.sickId,
//                     sickId1: data.sickId1,
//                     sickId2: data.sickId2,
//                     time: data.time,
//                     star: data.star,
//                     calo: data.calo,
//                 });
//                 resolve({
//                     errCode: 0,
//                     message: "Lưu thành công !",
//                 });
//             }
//         } catch (error) {
//             reject({
//                 errCode: 3,
//                 message: "Error !",
//             });
//         }
//     });
// };
let createNewFood = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.file) {
                await db.Food.create({
                    name: data.name,
                    detail: data.detail,
                    tag: data.tag,
                    categoryId: data.categoryId,
                    sickId: data.sickId,
                    sickId1: data.sickId1,
                    sickId2: data.sickId2,
                    time: data.time,
                    star: data.star,
                    calo: data.calo,
                    image: req.file.path,
                });
                console.log(req.file);
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
            else {
                await db.Food.create({
                    name: data.name,
                    detail: data.detail,
                    tag: data.tag,
                    categoryId: data.categoryId,
                    sickId: data.sickId,
                    sickId1: data.sickId1,
                    sickId2: data.sickId2,
                    time: data.time,
                    star: data.star,
                    calo: data.calo,
                });
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
        } catch (error) {
            reject({
                errCode: 3,
                message: "Error !",
            });
        }
    });
};

let deleteOneFood = (idFood) => {
    return new Promise(async (resolve, reject) => {
        try {
            let food = await db.Food.findOne({ where: { id: idFood } });
            if (!food) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    food,
                });
            }
            await db.Food.destroy({
                where: { id: idFood },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                food,
            });
        } catch (error) {
            reject(error);
        }
    });
};
// let updateFoodData = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (req.file) {
//                 try {
//                     if (req.file) {
//                         console.log(req.file)
//                         const blob = buckket.file(req.file.originalname);
//                         const blobStream = blob.createWriteStream();
//                         await blobStream.on('finish', () => {
//                         })
//                         blobStream.end(req.file.buffer);
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id food",
//                         data,
//                     });
//                 } else {
//                     let food = await db.Food.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (food) {

//                         food.name = data.name,
//                             food.detail = data.detail,
//                             food.tag = data.tag,
//                             food.categoryId = data.categoryId,
//                             food.sickId = data.sickId,
//                             food.sickId1 = data.sickId1,
//                             food.sickId2 = data.sickId2,
//                             food.time = data.time,
//                             food.star = data.star,
//                             food.calo = data.calo,
//                             food.image = req.file.originalname,
//                             await food.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }
//             else {
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id food",
//                         data,
//                     });
//                 } else {
//                     let food = await db.Food.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (food) {
//                         food.name = data.name,
//                             food.detail = data.detail,
//                             food.tag = data.tag,
//                             food.categoryId = data.categoryId,
//                             food.sickId = data.sickId,
//                             food.sickId1 = data.sickId1,
//                             food.sickId2 = data.sickId2,
//                             food.time = data.time,
//                             food.star = data.star,
//                             food.calo = data.calo,
//                             await food.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }

//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let updateFoodData = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.file) {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id food",
                        data,
                    });
                } else {
                    let food = await db.Food.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (food) {
                        food.name = data.name,
                            food.detail = data.detail,
                            food.tag = data.tag,
                            food.categoryId = data.categoryId,
                            food.sickId = data.sickId,
                            food.sickId1 = data.sickId1,
                            food.sickId2 = data.sickId2,
                            food.time = data.time,
                            food.star = data.star,
                            food.calo = data.calo,
                            food.image = req.file.path,
                            await food.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }
            else {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id food",
                        data,
                    });
                } else {
                    let food = await db.Food.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (food) {
                        food.name = data.name,
                            food.detail = data.detail,
                            food.tag = data.tag,
                            food.categoryId = data.categoryId,
                            food.sickId = data.sickId,
                            food.sickId1 = data.sickId1,
                            food.sickId2 = data.sickId2,
                            food.time = data.time,
                            food.star = data.star,
                            food.calo = data.calo,
                            await food.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }

        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllFood = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.Delete === 1) {
                await db.Food.destroy({
                    where: {},
                    truncate: true
                })
            }
            resolve({
                errCode: 0,
                message: "Xóa tât cả thành công",
            });
        } catch (error) {
            reject(error);
        }
    });
}
let createExcelFood = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            data.forEach(async (value, index) => {
                await db.Food.create({
                    name: value.name,
                    detail: value.detail,
                    tag: value.tag,
                    image: value.image,
                    categoryId: Number(value.categoryId),
                    sickId: Number(value.sickId),
                    sickId1: Number(value.sickId1),
                    sickId2: Number(value.sickId2),
                    time: Number(value.time),
                    star: Number(value.star),
                    calo: Number(value.calo),
                });
            })
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};


//ExerciseCa
let createNewExerciseCa = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            if (data) {
                await db.CategoryExercise.create({
                    name: data.name,
                    detail: data.detail,
                });
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
            else {
                resolve({
                    errCode: 0,
                    message: "Missing Data !",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteOneExerciseCa = (idExeCa) => {
    return new Promise(async (resolve, reject) => {
        try {
            let exeCa = await db.CategoryExercise.findOne({ where: { id: idExeCa } });
            if (!exeCa) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    exeCa,
                });
            }
            await db.CategoryExercise.destroy({
                where: { id: idExeCa },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                exeCa,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let updateExeCaData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Không có id CategoryExercise",
                    data,
                });
            } else {
                let exeCa = await db.CategoryExercise.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (exeCa) {
                    exeCa.name = data.name,
                        exeCa.detail = data.detail,
                        await exeCa.save();
                    resolve({
                        errCode: 0,
                        message: "Da sua",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "Khong sua dc ",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Exe
// let createNewExe = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (req.file) {
//                 try {
//                     if (req.file) {
//                         const blob = buckket.file(req.file.originalname);
//                         const blobStream = blob.createWriteStream();
//                         await blobStream.on('finish', () => {
//                         })
//                         blobStream.end(req.file.buffer);
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 await db.Exercise.create({
//                     name: data.name,
//                     detail: data.detail,
//                     categoryId: data.categoryId,
//                     time: data.time,
//                     sickId: data.sickId,
//                     sickId1: data.sickId1,
//                     sickId2: data.sickId2,
//                     star: data.star,
//                     image: req.file.originalname,

//                 });
//                 resolve({
//                     errCode: 0,
//                     message: "Lưu thành công !",
//                 });
//             }
//             else {
//                 await db.Exercise.create({
//                     name: data.name,
//                     detail: data.detail,
//                     sickId: data.sickId,
//                     sickId1: data.sickId1,
//                     sickId2: data.sickId2,
//                     categoryId: data.categoryId,
//                     time: data.time,
//                     star: data.star,
//                 });
//                 resolve({
//                     errCode: 0,
//                     message: "Lưu thành công !",
//                 });
//             }
//         } catch (error) {
//             reject({
//                 errCode: 3,
//                 message: "Error !",
//             });
//         }
//     });
// };
let createNewExe = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.file) {
                await db.Exercise.create({
                    name: data.name,
                    detail: data.detail,
                    categoryId: data.categoryId,
                    time: data.time,
                    sickId: data.sickId,
                    sickId1: data.sickId1,
                    sickId2: data.sickId2,
                    star: data.star,
                    image: req.file.path,

                });
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
            else {
                await db.Exercise.create({
                    name: data.name,
                    detail: data.detail,
                    sickId: data.sickId,
                    sickId1: data.sickId1,
                    sickId2: data.sickId2,
                    categoryId: data.categoryId,
                    time: data.time,
                    star: data.star,
                });
                resolve({
                    errCode: 0,
                    message: "Lưu thành công !",
                });
            }
        } catch (error) {
            reject({
                errCode: 3,
                message: "Error !",
            });
        }
    });
};
let deleteOneExercise = (idExe) => {
    return new Promise(async (resolve, reject) => {
        try {
            let exeCa = await db.Exercise.findOne({ where: { id: idExe } });
            if (!exeCa) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    exeCa,
                });
            }
            await db.Exercise.destroy({
                where: { id: idExe },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                exeCa,
            });
        } catch (error) {
            reject(error);
        }
    });
};
// let updateExeData = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (req.file) {
//                 try {
//                     if (req.file) {
//                         console.log(req.file)
//                         const blob = buckket.file(req.file.originalname);
//                         const blobStream = blob.createWriteStream();
//                         await blobStream.on('finish', () => {
//                         })
//                         blobStream.end(req.file.buffer);
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id Exercise",
//                         data,
//                     });
//                 } else {
//                     let exe = await db.Exercise.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (exe) {
//                         exe.name = data.name,
//                             exe.detail = data.detail,
//                             exe.categoryId = data.categoryId,
//                             exe.time = data.time,
//                             exe.sickId = data.sickId,
//                             exe.sickId1 = data.sickId1,
//                             exe.sickId2 = data.sickId2,
//                             exe.star = data.star,
//                             exe.image = req.file.originalname,
//                             await exe.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }
//             else {
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id bệnh",
//                         data,
//                     });
//                 } else {
//                     let exe = await db.Exercise.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (exe) {
//                         exe.name = data.name,
//                             exe.detail = data.detail,
//                             exe.categoryId = data.categoryId,
//                             exe.time = data.time,
//                             exe.star = data.star,
//                             await exe.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }

//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let updateExeData = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.file) {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id Exercise",
                        data,
                    });
                } else {
                    let exe = await db.Exercise.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (exe) {
                        exe.name = data.name,
                            exe.detail = data.detail,
                            exe.categoryId = data.categoryId,
                            exe.time = data.time,
                            exe.sickId = data.sickId,
                            exe.sickId1 = data.sickId1,
                            exe.sickId2 = data.sickId2,
                            exe.star = data.star,
                            exe.image = req.file.path,
                            await exe.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }
            else {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id bệnh",
                        data,
                    });
                } else {
                    let exe = await db.Exercise.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (exe) {
                        exe.name = data.name,
                            exe.detail = data.detail,
                            exe.categoryId = data.categoryId,
                            exe.time = data.time,
                            exe.star = data.star,
                            await exe.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }

        } catch (error) {
            reject(error);
        }
    });
};
let createExcelExe = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const value of data) {
                await db.Exercise.create({
                    name: value.name,
                    detail: value.detail,
                    image: value.image,
                    categoryId: Number(value.categoryId),
                    sickId: Number(value.sickId),
                    sickId1: Number(value.sickId1),
                    sickId2: Number(value.sickId2),
                    time: Number(value.time),
                    star: Number(value.star),
                });
            }
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllExe = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.Delete === 1) {
                await db.Exercise.destroy({
                    where: {},
                    truncate: true
                })
            }
            resolve({
                errCode: 0,
                message: "Xóa tât cả thành công",
            });
        } catch (error) {
            reject(error);
        }
    });
}

//Sick
// let createNewSick = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             try {
//                 if (req.file) {
//                     const blob = buckket.file(req.file.originalname);
//                     const blobStream = blob.createWriteStream();
//                     await blobStream.on('finish', () => {
//                     })
//                     blobStream.end(req.file.buffer);
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//             await db.Sick.create({
//                 name: data.name,
//                 tag: data.tag,
//                 detail: data.detail,
//                 arring: data.arring,
//                 image: req.file.originalname,
//             });
//             resolve({
//                 errCode: 0,
//                 message: "Lưu thành công !",
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let createNewSick = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Sick.create({
                name: data.name,
                tag: data.tag,
                detail: data.detail,
                arring: data.arring,
                image: req.file.path,
            });
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let createExcelSick = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const value of data) {
                await db.Sick.create({
                    name: value.name,
                    tag: value.tag,
                    detail: value.detail,
                    image: value.image,
                    arring: value.arring,
                })
            };
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteOneSick = (idSick) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sick = await db.Sick.findOne({ where: { id: idSick } });
            if (!sick) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    idSick,
                });
            }
            await db.Sick.destroy({
                where: { id: idSick },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                idSick,
            });
        } catch (error) {
            reject(error);
        }
    });
};
// let updateSickData = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (req.file) {
//                 try {
//                     if (req.file) {
//                         console.log(req.file)
//                         const blob = buckket.file(req.file.originalname);
//                         const blobStream = blob.createWriteStream();
//                         await blobStream.on('finish', () => {
//                         })
//                         blobStream.end(req.file.buffer);
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id bệnh",
//                         data,
//                     });
//                 } else {
//                     let sick = await db.Sick.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (sick) {
//                         sick.name = data.name,
//                             sick.tag = data.tag,
//                             sick.arring = data.arring,
//                             sick.detail = data.detail,
//                             sick.image = req.file.originalname,
//                             await sick.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }
//             else {
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id bệnh",
//                         data,
//                     });
//                 } else {
//                     let sick = await db.Sick.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (sick) {
//                         sick.name = data.name,
//                             sick.arring = data.arring,
//                             sick.tag = data.tag,
//                             sick.detail = data.detail,
//                             await sick.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }

//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let updateSickData = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.file) {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id bệnh",
                        data,
                    });
                } else {
                    let sick = await db.Sick.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (sick) {
                        sick.name = data.name,
                            sick.tag = data.tag,
                            sick.arring = data.arring,
                            sick.detail = data.detail,
                            sick.image = req.file.path,
                            await sick.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }
            else {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id bệnh",
                        data,
                    });
                } else {
                    let sick = await db.Sick.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (sick) {
                        sick.name = data.name,
                            sick.arring = data.arring,
                            sick.tag = data.tag,
                            sick.detail = data.detail,
                            await sick.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }

        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllSick = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.Delete === 1) {
                await db.Sick.destroy({
                    where: {},
                    truncate: true
                })
            }
            resolve({
                errCode: 0,
                message: "Xóa tât cả thành công",
            });
        } catch (error) {
            reject(error);
        }
    });
}


//Blog
let deleteOneBlog = (idBlog) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.Blog.findOne({ where: { id: idBlog } });
            if (!blog) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    idBlog,
                });
            }
            await db.Blog.destroy({
                where: { id: idBlog },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                idBlog,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let createExcelBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            data.forEach(async (value, index) => {
                await db.Blog.create({
                    title: value.title,
                    categoryId: Number(value.categoryId),
                    tag: value.tag,
                    image: value.image,
                    star: Number(value.star),
                    detail: value.detail,
                });
            })
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};
// let createNewBlog = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             try {
//                 if (req.file) {
//                     const blob = buckket.file(req.file.originalname);
//                     const blobStream = blob.createWriteStream();
//                     await blobStream.on('finish', () => {
//                     })
//                     blobStream.end(req.file.buffer);
//                 }
//             } catch (error) {
//                 console.log(error)
//             }

//             await db.Blog.create({
//                 title: data.title,
//                 categoryId: data.categoryId,
//                 tag: data.tag,
//                 star: Number(data.star),
//                 detail: data.detail,
//                 image: req.file.originalname,
//             });
//             resolve({
//                 errCode: 0,
//                 message: "Lưu thành công !",
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let createNewBlog = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Blog.create({
                title: data.title,
                categoryId: data.categoryId,
                tag: data.tag,
                star: Number(data.star),
                detail: data.detail,
                image: req.file.path,
            });
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};
// let updateBlogData = (data, req) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (req.file) {
//                 try {
//                     if (req.file) {
//                         console.log(req.file)
//                         const blob = buckket.file(req.file.originalname);
//                         const blobStream = blob.createWriteStream();
//                         await blobStream.on('finish', () => {
//                         })
//                         blobStream.end(req.file.buffer);
//                     }
//                 } catch (error) {
//                     console.log(error)
//                 }
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id Blog",
//                         data,
//                     });
//                 } else {
//                     let blog = await db.Blog.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (blog) {
//                         blog.title = data.title,
//                             blog.categoryId = Number(data.categoryId),
//                             blog.tag = data.tag,
//                             blog.star = Number(data.star),
//                             blog.detail = data.detail,
//                             blog.image = req.file.originalname,
//                             await blog.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }
//             else {
//                 if (!data.id) {
//                     resolve({
//                         errCode: 1,
//                         message: "Không có id Blog",
//                         data,
//                     });
//                 } else {
//                     let blog = await db.Blog.findOne({
//                         where: {
//                             id: data.id,
//                         },
//                     });
//                     if (blog) {
//                         blog.title = data.title,
//                             blog.categoryId = Number(data.categoryId),
//                             blog.tag = data.tag,
//                             blog.star = Number(data.star),
//                             blog.detail = data.detail,
//                             await blog.save();
//                         resolve({
//                             errCode: 0,
//                             message: "Đã sửa ",
//                         });
//                     } else {
//                         resolve({
//                             errCode: 2,
//                             message: "Không sửa được !",
//                         });
//                     }
//                 }
//             }

//         } catch (error) {
//             reject(error);
//         }
//     });
// };
let updateBlogData = (data, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.file) {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id Blog",
                        data,
                    });
                } else {
                    let blog = await db.Blog.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (blog) {
                        blog.title = data.title,
                            blog.categoryId = Number(data.categoryId),
                            blog.tag = data.tag,
                            blog.star = Number(data.star),
                            blog.detail = data.detail,
                            blog.image = req.file.path,
                            await blog.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }
            else {
                if (!data.id) {
                    resolve({
                        errCode: 1,
                        message: "Không có id Blog",
                        data,
                    });
                } else {
                    let blog = await db.Blog.findOne({
                        where: {
                            id: data.id,
                        },
                    });
                    if (blog) {
                        blog.title = data.title,
                            blog.categoryId = Number(data.categoryId),
                            blog.tag = data.tag,
                            blog.star = Number(data.star),
                            blog.detail = data.detail,
                            await blog.save();
                        resolve({
                            errCode: 0,
                            message: "Đã sửa ",
                        });
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Không sửa được !",
                        });
                    }
                }
            }

        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = "";
            if (data.Delete === 1) {
                await db.Blog.destroy({
                    where: {},
                    truncate: true
                })
            }
            resolve({
                errCode: 0,
                message: "Xóa tât cả thành công",
            });
        } catch (error) {
            reject(error);
        }
    });
}

//Ingredient
let createNewIngredient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            data.forEach(async (value, index) => {
                await db.Ingredient.create({
                    name: value.name,
                    category: value.category,
                    unit: value.unit,
                    calo: Number(value.calo),
                    protein: Number(value.protein),
                    fat: Number(value.fat),
                    carb: Number(value.carb),
                    fiber: Number(value.fiber),
                    cholesterol: Number(value.cholesterol),
                    canxi: Number(value.canxi),
                    photpho: Number(value.photpho),
                    fe: Number(value.fe),
                    natri: Number(value.natri),
                    kali: Number(value.kali),
                    betacaroten: Number(value.betacaroten),
                    vita: Number(value.vita),
                    vitb1: Number(value.vitb1),
                    vitc: Number(value.vitc),
                });
            })
            resolve({
                errCode: 0,
                message: "Lưu thành công !",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteAllIngredient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let message = "";
            if (data.Delete === 1) {
                message = "Xóa thành công"
                await db.Ingredient.destroy({
                    where: {},
                    truncate: true
                })
            }
            resolve({
                errCode: 0,
                message: "Xóa thành công",
            });

        } catch (error) {
            reject(error);
        }
    });
}
let updateIngredientData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Không có id Ingredient",
                    data,
                });
            } else {
                let ingredient = await db.Ingredient.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (ingredient) {
                    // ingredient.name= data.name,
                    ingredient.category = data.category,
                        ingredient.unit = data.unit,
                        ingredient.calo = Number(data.calo),
                        ingredient.protein = Number(data.protein),
                        ingredient.fat = Number(data.fat),
                        ingredient.carb = Number(data.carb),
                        ingredient.fiber = Number(data.fiber),
                        ingredient.cholesterol = Number(data.cholesterol),
                        ingredient.canxi = Number(data.canxi),
                        ingredient.photpho = Number(data.photpho),
                        ingredient.fe = Number(data.fe),
                        ingredient.natri = Number(data.natri),
                        ingredient.kali = Number(data.kali),
                        ingredient.betacaroten = Number(data.betacaroten),
                        ingredient.vita = Number(data.vita),
                        ingredient.vitb1 = Number(data.vitb1),
                        ingredient.vitc = Number(data.vitc),

                        await ingredient.save();
                    resolve({
                        errCode: 0,
                        message: "Da sua",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "Khong sua dc ",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteOneIngredient = (idIngre) => {
    return new Promise(async (resolve, reject) => {
        try {
            let ingre = await db.Ingredient.findOne({ where: { id: idIngre } });
            if (!ingre) {
                resolve({
                    errCode: 1,
                    message: "Không tồn tại !",
                    idIngre,
                });
            }
            await db.Ingredient.destroy({
                where: { id: idIngre },
            });
            resolve({
                errCode: 0,
                message: "Xóa thành công !",
                idIngre,
            });
        } catch (error) {
            reject(error);
        }
    });
};

//User & Login
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                // coparepass
                let user = await db.User.findOne({
                    attributes: ["id", "email", "password", "roleID", "jwtToken"],
                    where: {
                        email: email,
                    },
                    raw: true,
                });

                if (user) {
                    let check = bcrypt.compareSync(password, user.password);
                    if (user.roleID != 1) {
                        userData.errCode = 5;
                        userData.errmessage = "Không phải tài khoản Admin !";
                    }
                    else if (user.roleID == 1 && check) {

                        let payload = { id: user.id, roleID: user.roleID, email: email }
                        let jwtToken = null;
                        try {
                            jwtToken = await jwt.sign(payload, process.env.JWT_SECRET);
                        } catch (error) {
                            console.log(error)
                        }

                        let userx = await db.User.findOne({
                            where: {
                                id: user.id,
                            },
                        });
                        if (userx) {
                            userx.jwtToken = jwtToken;
                            await userx.save();
                        }
                        userData.errCode = 0;
                        userData.errmessage = null;
                        userData.jwtToken = jwtToken;
                        delete user.password;// Hien trhong tin user
                    } else {
                        userData.errCode = 3;
                        userData.errmessage = "Sai mật khẩu !";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errmessage = "Tài khoản không tồn tại !";
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.errmessage = "Email không tồn tại";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Đã có tài khoản đăng ký bằng email này !",
                });
            }
            else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    fullName: data.fullName,
                    age: data.age,
                    address: data.address,
                    // phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    // image: DataTypes.STRING,
                    roleId: data.roleId,
                    // positionId: DataTypes.STRING,
                });
                resolve({
                    errCode: 0,
                    message: "OK",
                    data,
                });
            }

        } catch (error) {
            reject(error);
        }
    });
};
let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = "";
            if (!userId) {
                users = await db.User.findAll({
                    order: [
                        ['age', 'DESC'],
                        ["email", "ASC"],
                    ],
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    attributes: {
                        exclude: ["password"],
                    },
                    where: {
                        id: userId,
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: "Không có id User",
                    data,
                });
            } else {
                let user = await db.User.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (user) {
                    user.fullName = data.fullName;
                    user.gender = data.gender;
                    user.roleId = data.roleId;
                    user.age = data.age;
                    user.address = data.address;
                    await user.save();
                    resolve({
                        errCode: 0,
                        message: "Đã sửa",
                        data,
                    });
                } else {
                    resolve({
                        errCode: 2,
                        message: "Không sửa được",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};
let deleteUserData = (idUser, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { message, errCode, checkUserRole } = getUserRole(token);
            console.log(checkUserRole);
            if (checkUserRole) {
                let user = await db.User.findOne({ where: { id: idUser } });
                if (!user) {
                    errCode = 1;
                    message = "Không tồn tại !";
                }
                await db.User.destroy({
                    where: { id: idUser },
                });
                message = "Đã xóa!";
            } else {
                errCode = 2;
                message = "Không có quyền!";
            }
            resolve({
                errCode,
                message,
                idUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};
let checkUserEmail = userEmail => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
}
let verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    try {
        let encoded = jwt.verify(token, key);
        data = encoded;
    } catch (error) {
        console.log(error)
    }
    return data;
}

//Chekcrole
const getUserRole = (token) => {
    let vT = {};
    let message = "";
    let errCode = 0;
    let roleId = 0;
    try {
        vT = verifyToken(token);
    } catch (error) {
        message = "JWT Fall";
    }
    if (vT !== null && vT.roleID) {
        roleId = vT.roleID;
    }
    let checkUserRole = roleId == 1;
    return { message, errCode, checkUserRole };
};

module.exports = {
    createNewUser,
    getAllUser,
    updateUserData,
    deleteUserData,
    handleUserLogin,
    createNewIngredient,
    deleteAllIngredient,
    deleteOneIngredient,
    updateIngredientData,
    createNewBlog,
    deleteOneBlog,
    deleteAllBlog,
    updateBlogData,
    createExcelBlog,
    createNewSick,
    createExcelSick,
    deleteOneSick,
    updateSickData,
    deleteAllSick,
    createNewExerciseCa,
    deleteOneExerciseCa,
    updateExeCaData,
    createNewExe,
    deleteOneExercise,
    updateExeData,
    createExcelExe,
    deleteAllExe,
    createNewFoodCa,
    deleteFoodCa,
    updateFoodCaData,
    createNewFood,
    deleteOneFood,
    updateFoodData,
    deleteAllFood,
    createExcelFood
}