import moment from "moment"

export const dateExplicit = (val_: string) => {
    return moment(val_).format("DD-MM-YYYY @ HH:mm");
}