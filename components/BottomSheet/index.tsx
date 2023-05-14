import { Box, Modal, SxProps } from "@mui/material";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: any,
    children: React.ReactNode
}

const bottomSheetStyle:SxProps = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: "12px 12px 0 0",
    backgroundColor: "#fff",
    minHeight: 300,
    padding: 2,
    boxSizing: "border-box"
}

export const BottomSheet:React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;
    return(
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={bottomSheetStyle}>
                { children }
            </Box>
        </Modal>
    )
}