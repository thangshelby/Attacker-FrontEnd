import { useEffect } from "react";
import { notificationService } from "@/services/notification.service";

export const useNotifcationRealTime=()=>{
    useEffect(() => {
        // Connect to the notification service
        notificationService.connect();
    
        // Cleanup on unmount
        return () => {
        notificationService.disconnect();
        };
    }, []);
    
    const handleNewNotification = (notification) => {
        console.log("New notification received:", notification);
    };
    const emitNewNotification = (notification) => {
        
    }
    
    // Listen for new notifications
    useEffect(() => {
        notificationService.onNewNotification(handleNewNotification);
    
        return () => {
        notificationService.offNewNotification(handleNewNotification);
        };
    }, []);
    
    return {
        handleNewNotification,
        emitNewNotification
        // emitNewNotification: notificationService.emitNewNotification,
    };   
}