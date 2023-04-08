import Branch from '../models/Branch';

export const getBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch.findByPk(id);
        res.json(branch);
    } catch (error) {
        console.log(error);
    }
    };

export const getBranches = async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (error) {
        console.log(error);
    }
}

export const createBranch = async (req, res) => {
    try {
        const { name, location } = req.body;
        const branch = await Branch.create({
            name,
            location,
        });
        res.json(branch);
    } catch (error) {
        console.log(error);
    }
}

export const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        const branch = await Branch.update(
            {
                name,
                location,
            },
            {
                where: { id }
            }
        );
        res.json(branch);
    } catch (error) {
        console.log(error);
    }
}

export const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await Branch.destroy({
            where: { id }
        });
        res.json(branch);
    } catch (error) {
        console.log(error);
    }
};