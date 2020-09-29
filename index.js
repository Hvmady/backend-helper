// Registering Function
const Register = async (Model, Data) => {
    try {
        // create new data
        const NewData = new Model(Data)

        // save new data
        const DataSaved = await NewData.save()

        // verify saved data
        if (DataSaved)
            return { Success: true, Message: DataSaved }
        else
            return { Success: false, Message: 'Registration failed' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Editing Function
const Edit = async (Model, Id) => {
    try {

        // find data by id
        const DataExist = await Model.findById(Id).exec()

        // verify data existance
        if (DataExist)
            return { Success: true, Message: DataExist }
        else
            return { Success: false, Message: 'No data has been found' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Updating function
const Update = async (Model, Data) => {
    try {

        // find data by id and update
        const DataUpdated = await Model.findByIdAndUpdate(Data.Id)
            .then(async DataExist => {
                try {
                    console.log(DataExist)
                    // verify data existance
                    if (DataExist) {
                        DataExist = Data
                        DataExist._id = Data.Id
                        console.log(DataExist)
                        // update exist data with new data
                        const DataSaved = await DataExist.save()

                        // verify saved data
                        if (DataSaved) return DataSaved
                        else return false

                    }
                    else return false

                } catch (error) {
                    return false
                }
            })
            .catch(error => false)

        // verify updated
        if (DataUpdated)
            return { Success: true, Message: DataUpdated }
        else
            return { Success: false, Message: 'Failed to update' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Deleting Fuction (one data)
const Delete = async (Model, Id) => {
    try {

        // find data by id and delete 
        const DataDeleted = await Model.findByIdAndDelete(Id).exec()

        // verify deleted data
        if (DataDeleted)
            return { Success: true, Message: DataDeleted }
        else
            return { Success: false, Message: 'Failed to delete' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Deleting Function (many data)
const DeleteMany = async (Model, Condition) => {
    try {

        // find data by condition and delete
        const DataDeleted = await Model.deleteMany(Condition).exec()

        // verify deleted data
        if (DataDeleted)
            return { Success: true, Message: 'Data has been deleted' }
        else
            return { Success: false, Message: 'Failed to delete' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Listing Function (pagination)
const List = async (Model, Condition, Sort, Page, PageLimit) => {
    try {
        //pagination
        const PageNumber = parseInt(Page)
        const StartIndex = (PageNumber - 1) * PageLimit
        const EndIndex = PageNumber * PageLimit
        const Results = {}

        // check if there is  next  page
        if (EndIndex < await Model.find(Condition).countDocuments().exec()) {
            Results.Next = {
                Page: PageNumber + 1
            }
        }
        // check if there is previous page
        if (StartIndex > 0) {
            Results.Previous = {
                Page: PageNumber - 1
            }
        }

        // find model data under a condition given
        Results.Data = await Model.find(Condition).sort(Sort).limit(PageLimit).skip(StartIndex).exec()


        // check if data result is more than zero 0
        if (Results.Data.length > 0)
            return { Success: true, Message: Results }
        else
            return { Success: false, Message: 'No data has been found' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Listing Function (all in without pagination)
const ListAll = async (Model, Condition, Sort) => {
    try {

        // find data
        const Data = await Model.find(Condition).sort(Sort).exec()

        // check if data length > 0
        if (Data.length > 0)
            return { Success: true, Message: Data }
        else
            return { Success: false, Message: 'No data has been found' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Validate function on creating new data
const ValidateCreate = async (Model, Condition) => {
    try {
        // find data
        const DataExist = await Model.findOne(Condition).exec()

        if (DataExist)
            return { Success: true }
        else
            return { Success: false }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// Validate function on updating
const ValidateUpdate = async (Model, Condition, Id) => {
    try {

        // find data
        const DataExist = await Model.findOne(Condition).exec()

        if (DataExist)
            if (DataExist._id == Id)
                return { Success: true }
            else
                return { Success: false }
        else
            return { Success: true }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

// current year
const CurrentYear = () => {
    return new Date().getFullYear()
}

// current month
const CurrentMonth = () => {
    const MonthNumber = []
        MonthNumber[0] = 'January'
        MonthNumber[1] = 'February'
        MonthNumber[2] = 'March'
        MonthNumber[3] = 'April'
        MonthNumber[4] = 'May'
        MonthNumber[5] = 'June'
        MonthNumber[6] = 'July'
        MonthNumber[7] = 'August'
        MonthNumber[8] = 'September'
        MonthNumber[9] = 'October'
        MonthNumber[10] = 'November'
        MonthNumber[11] = 'December'
        return MonthNumber[new Date().getMonth()]
}

const Search = async (Model, Condition, Sort) => {
    try {

        const Data = await Model.find(Condition).sort(Sort).exec()

        if (Data.length)
            return { Success: true, Message: Data }
        else
            return { Success: false, Message: 'No data has been found' }

    } catch (error) {
        return { Success: false, Message: error.message }
    }
}

module.exports = { Register, Edit, Update, Delete, DeleteMany, List, ListAll, CurrentYear, CurrentMonth, ValidateCreate, ValidateUpdate, Search } 