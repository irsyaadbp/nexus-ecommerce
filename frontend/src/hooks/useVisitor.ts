import { useState, useCallback } from 'react';
import { VISITOR_ID_KEY } from '../lib/constants';

export function getVisitorId(): string {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
        // Generate a simple unique ID
        visitorId = `visitor-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }

    return visitorId;
}

export function setVisitorIdStorage(id: string): void {
    localStorage.setItem(VISITOR_ID_KEY, id);
}

export function useVisitor() {
    const [visitorId, setVisitorIdState] = useState<string>(getVisitorId());

    const setVisitorId = useCallback((id: string) => {
        setVisitorIdStorage(id);
        setVisitorIdState(id);
    }, []);

    return { visitorId, setVisitorId };
}
