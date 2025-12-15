import DOMPurify from 'dompurify';

/**
 * HTML içeriğini XSS saldırılarından korumak için temizler
 */
export function sanitize(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
        ALLOWED_ATTR: [],
    });
}

/**
 * Video form validation
 */
export function validateVideoForm(data: {
    title: string;
    youtubeId: string;
    kahootLink?: string;
    wordwallKitaplik?: string;
    wordwallCarkifelek?: string;
}): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Title validation
    if (!data.title || data.title.trim().length < 3) {
        errors.push('Video başlığı en az 3 karakter olmalıdır');
    }
    if (data.title && data.title.length > 200) {
        errors.push('Video başlığı çok uzun (maksimum 200 karakter)');
    }

    // YouTube ID validation
    const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    if (!data.youtubeId || !youtubeIdRegex.test(data.youtubeId)) {
        errors.push('Geçersiz YouTube video ID (11 karakter olmalı)');
    }

    // Optional URL validations
    if (data.kahootLink && !isValidUrl(data.kahootLink)) {
        errors.push('Geçersiz Kahoot URL');
    }
    if (data.wordwallKitaplik && !isValidUrl(data.wordwallKitaplik)) {
        errors.push('Geçersiz Wordwall Kitaplık URL');
    }
    if (data.wordwallCarkifelek && !isValidUrl(data.wordwallCarkifelek)) {
        errors.push('Geçersiz Wordwall Çarkıfelek URL');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Unit form validation
 */
export function validateUnitForm(data: { name: string }): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Ünite adı en az 2 karakter olmalıdır');
    }
    if (data.name && data.name.length > 100) {
        errors.push('Ünite adı çok uzun (maksimum 100 karakter)');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * URL format validation
 */
export function isValidUrl(urlString: string): boolean {
    if (!urlString || urlString.trim().length === 0) {
        return true; // Empty is valid (optional field)
    }

    try {
        const url = new URL(urlString);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Debounce function for rate limiting
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: number | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait) as unknown as number;
    };
}
