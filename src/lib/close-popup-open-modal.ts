export const closePopupOpenModal = (
	setIsOpenPopup: (value: boolean | ((prev: boolean) => boolean)) => void,
	setIsOpenModal: (value: boolean | ((prev: boolean) => boolean)) => void,
) => {
	setIsOpenPopup((prev) => !prev)
	setIsOpenModal((prev) => !prev)
}