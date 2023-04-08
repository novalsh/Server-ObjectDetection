import Histroy from '../model/Histroy';

export const getHistroys = async (req, res) => {
    try {
        const histroys = await Histroy.findAll();
        res.json(histroys);
    } catch (error) {
        console.log(error);
    }
}

export const getHistroy = async (req, res) => {
    try {
        const { id } = req.params;
        const histroy = await Histroy.findByPk(id);
        res.json(histroy);
    } catch (error) {
        console.log(error);
    }
}
