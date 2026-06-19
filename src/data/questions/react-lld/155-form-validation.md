---
id: 155
category: React LLD
priority: high
tags: [form, validation, controlled-components, user-experience]
---

# How would you build a form with real-time validation?

## Quick Answer

Create a form using controlled components with useState for each field value. Implement validation logic that runs on change (real-time) and on blur, displaying error messages immediately. Use custom validation rules (required, email, minLength, pattern), show visual feedback (red borders, error text), disable submit button until form is valid, and provide clear error messages. Handle edge cases like touched fields, async validation (username availability), and form submission states.

## Detailed Explanation

### Controlled vs Uncontrolled Components

#### Controlled (Recommended for Forms)

```typescript
const [email, setEmail] = useState('');

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Pros:** ✅ Full control, real-time validation, easy to reset
**Cons:** ❌ More re-renders, more code

#### Uncontrolled

```typescript
const inputRef = useRef<HTMLInputElement>(null);

// Access value when needed
const value = inputRef.current?.value;
```

**Pros:** ✅ Less re-renders, simpler
**Cons:** ❌ Harder to validate in real-time, difficult to reset

### Validation Strategy

#### 1. Validation Rules

Define reusable validation functions:

```typescript
interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

const validators: Record<string, ValidationRule[]> = {
  required: [
    {
      validate: (value) => value.trim().length > 0,
      message: 'This field is required',
    },
  ],
  
  email: [
    {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email',
    },
  ],
  
  minLength: (min: number) => [
    {
      validate: (value) => value.length >= min,
      message: `Must be at least ${min} characters`,
    },
  ],
  
  pattern: (regex: RegExp, message: string) => [
    {
      validate: (value) => regex.test(value),
      message,
    },
  ],
};
```

#### 2. Real-Time Validation

Validate on every change:

```typescript
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
});

const [errors, setErrors] = useState<Record<string, string>>({});
const [touched, setTouched] = useState<Record<string, boolean>>({});

const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'username':
      if (!value.trim()) return 'Username is required';
      if (value.length < 3) return 'Username must be at least 3 characters';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
      return null;
      
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return null;
      
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
      if (!/[0-9]/.test(value)) return 'Password must contain a number';
      return null;
      
    default:
      return null;
  }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  
  // Update value
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Validate in real-time (only if field was touched)
  if (touched[name]) {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || '',
    }));
  }
};

const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  
  // Mark as touched
  setTouched(prev => ({ ...prev, [name]: true }));
  
  // Validate on blur
  const error = validateField(name, value);
  setErrors(prev => ({
    ...prev,
    [name]: error || '',
  }));
};
```

#### 3. Form-Level Validation

Check entire form validity:

```typescript
const isFormValid = useMemo(() => {
  // All fields must be non-empty
  const allFilled = Object.values(formData).every(value => value.trim() !== '');
  
  // No errors
  const noErrors = Object.values(errors).every(error => !error);
  
  // All fields touched
  const allTouched = Object.keys(formData).every(field => touched[field]);
  
  return allFilled && noErrors && allTouched;
}, [formData, errors, touched]);
```

### Async Validation

Validate against server (e.g., username availability):

```typescript
const [validating, setValidating] = useState<Record<string, boolean>>({});

const validateUsername = async (username: string): Promise<string | null> => {
  if (!username) return 'Username is required';
  if (username.length < 3) return 'Username must be at least 3 characters';
  
  setValidating(prev => ({ ...prev, username: true }));
  
  try {
    const response = await fetch(`/api/check-username?username=${username}`);
    const data = await response.json();
    
    if (!data.available) {
      return 'Username is already taken';
    }
    
    return null;
  } catch (error) {
    return 'Failed to check username availability';
  } finally {
    setValidating(prev => ({ ...prev, username: false }));
  }
};

// Debounced async validation
useEffect(() => {
  if (!formData.username || !touched.username) return;
  
  const timeoutId = setTimeout(async () => {
    const error = await validateUsername(formData.username);
    setErrors(prev => ({ ...prev, username: error || '' }));
  }, 500);
  
  return () => clearTimeout(timeoutId);
}, [formData.username, touched.username]);
```

### Error Display Patterns

#### Inline Errors

```typescript
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    onBlur={handleBlur}
    className={errors.email ? 'input-error' : ''}
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <span id="email-error" className="error-message" role="alert">
      {errors.email}
    </span>
  )}
</div>
```

#### Summary Errors

```typescript
{Object.keys(errors).length > 0 && (
  <div className="error-summary" role="alert">
    <h3>Please fix the following errors:</h3>
    <ul>
      {Object.entries(errors).map(([field, error]) => (
        error && <li key={field}>{error}</li>
      ))}
    </ul>
  </div>
)}
```

### Form Submission

```typescript
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
const [submitSuccess, setSubmitSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate all fields
  const newErrors: Record<string, string> = {};
  Object.entries(formData).forEach(([name, value]) => {
    const error = validateField(name, value);
    if (error) {
      newErrors[name] = error;
    }
  });
  
  setErrors(newErrors);
  
  // Stop if errors
  if (Object.keys(newErrors).length > 0) {
    // Focus first error field
    const firstErrorField = Object.keys(newErrors)[0];
    document.getElementById(firstErrorField)?.focus();
    return;
  }
  
  setSubmitting(true);
  setSubmitError(null);
  
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    setSubmitSuccess(true);
    
    // Reset form
    setFormData({ username: '', email: '', password: '' });
    setTouched({});
    setErrors({});
  } catch (error: any) {
    setSubmitError(error.message || 'An error occurred');
  } finally {
    setSubmitting(false);
  }
};
```

### Advanced Features

#### Password Strength Indicator

```typescript
const getPasswordStrength = (password: string): { score: number; label: string } => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  
  return {
    score: Math.min(score, 4),
    label: labels[Math.min(score, 4)],
  };
};

const strength = getPasswordStrength(formData.password);

<div className="password-strength">
  <div className={`strength-bar strength-${strength.score}`} />
  <span>{strength.label}</span>
</div>
```

#### Field Dependencies

```typescript
// Confirm password must match password
const validateConfirmPassword = (value: string): string | null => {
  if (!value) return 'Please confirm your password';
  if (value !== formData.password) return 'Passwords do not match';
  return null;
};

// Re-validate when password changes
useEffect(() => {
  if (touched.confirmPassword) {
    const error = validateConfirmPassword(formData.confirmPassword);
    setErrors(prev => ({ ...prev, confirmPassword: error || '' }));
  }
}, [formData.password, touched.confirmPassword]);
```

## Code Example

```typescript
import React, { useState, useMemo, useCallback } from 'react';
import './FormValidation.css';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormTouched {
  [key: string]: boolean;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation functions
  const validateUsername = (value: string): string | null => {
    if (!value.trim()) return 'Username is required';
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  };

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*]/.test(value)) return 'Password must contain at least one special character (!@#$%^&*)';
    return null;
  };

  const validateConfirmPassword = (value: string): string | null => {
    if (!value) return 'Please confirm your password';
    if (value !== formData.password) return 'Passwords do not match';
    return null;
  };

  // Get validator for field
  const getValidator = (fieldName: string) => {
    const validators: Record<string, (value: string) => string | null> = {
      username: validateUsername,
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
    };
    return validators[fieldName];
  };

  // Validate single field
  const validateField = useCallback((name: string, value: string) => {
    const validator = getValidator(name);
    return validator ? validator(value) : null;
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation (only if already touched)
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  // Check if form is valid
  const isFormValid = useMemo(() => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    const noErrors = Object.values(errors).every(error => !error);
    const allTouched = Object.keys(formData).every(field => touched[field]);
    
    return allFieldsFilled && noErrors && allTouched;
  }, [formData, errors, touched]);

  // Password strength
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['#ff4444', '#ff8800', '#ffcc00', '#88cc00', '#44cc44'];
    
    return {
      score: Math.min(score, 4),
      label: labels[Math.min(score, 4)],
      color: colors[Math.min(score, 4)],
    };
  }, [formData.password]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    let hasErrors = false;
    
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    
    if (hasErrors) {
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }
    
    // Submit form
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setTouched({});
        setErrors({});
        setSubmitSuccess(false);
      }, 2000);
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    setTouched({});
    setErrors({});
    setSubmitError(null);
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      
      {/* Success Message */}
      {submitSuccess && (
        <div className="success-message" role="status">
          ✓ Account created successfully!
        </div>
      )}
      
      {/* Submit Error */}
      {submitError && (
        <div className="error-summary" role="alert">
          <strong>Error:</strong> {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter username"
            className={`form-input ${errors.username && touched.username ? 'input-error' : ''} ${touched.username && !errors.username ? 'input-success' : ''}`}
            aria-invalid={!!(errors.username && touched.username)}
            aria-describedby={errors.username ? 'username-error' : 'username-hint'}
            autoComplete="username"
          />
          <small id="username-hint" className="field-hint">
            3-20 characters, letters, numbers, and underscores only
          </small>
          {errors.username && touched.username && (
            <span id="username-error" className="error-message" role="alert">
              {errors.username}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            className={`form-input ${errors.email && touched.email ? 'input-error' : ''} ${touched.email && !errors.email ? 'input-success' : ''}`}
            aria-invalid={!!(errors.email && touched.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && touched.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter password"
            className={`form-input ${errors.password && touched.password ? 'input-error' : ''} ${touched.password && !errors.password ? 'input-success' : ''}`}
            aria-invalid={!!(errors.password && touched.password)}
            aria-describedby={errors.password ? 'password-error' : 'password-hint'}
            autoComplete="new-password"
          />
          <small id="password-hint" className="field-hint">
            Min 8 chars, include uppercase, lowercase, number, and special char
          </small>
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="password-strength">
              <div 
                className="strength-bar"
                style={{ 
                  width: `${(passwordStrength.score + 1) * 20}%`,
                  backgroundColor: passwordStrength.color 
                }}
              />
              <span className="strength-label">{passwordStrength.label}</span>
            </div>
          )}
          
          {errors.password && touched.password && (
            <span id="password-error" className="error-message" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Re-enter password"
            className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''} ${touched.confirmPassword && !errors.confirmPassword ? 'input-success' : ''}`}
            aria-invalid={!!(errors.confirmPassword && touched.confirmPassword)}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            autoComplete="new-password"
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span id="confirmPassword-error" className="error-message" role="alert">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={!isFormValid || submitting}
          >
            {submitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>

      {/* Form Status */}
      <div className="form-status">
        <p>Form Valid: {isFormValid ? '✓ Yes' : '✗ No'}</p>
        <p>Fields Touched: {Object.values(touched).filter(Boolean).length}/{Object.keys(touched).length}</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
```

## CSS Styling

```css
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Success/Error Messages */
.success-message {
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
  border-radius: 4px;
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease;
}

.error-summary {
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
  border-radius: 4px;
  margin-bottom: 1rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Groups */
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

/* Input Fields */
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Validation States */
.input-error {
  border-color: #dc3545 !important;
  background-color: #fff8f8;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
}

.input-success {
  border-color: #28a745 !important;
}

.input-success:focus {
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1) !important;
}

/* Hints and Errors */
.field-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #666;
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Password Strength */
.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: all 0.3s ease;
  margin-bottom: 0.25rem;
}

.strength-label {
  font-size: 0.75rem;
  color: #666;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary, .btn-secondary {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover:not(:disabled) {
  background: #d0d0d0;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Form Status */
.form-status {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #666;
}

.form-status p {
  margin: 0.25rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .form-container {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
```

## Common Interview Follow-ups

1. **Controlled vs uncontrolled - when to use each?**
   - **Controlled**: Real-time validation, dynamic forms, conditional fields, complex state management
   - **Uncontrolled**: Simple forms, file inputs, performance-critical scenarios, integrating with non-React code
   - Most production forms use controlled for better UX

2. **How to handle async validation without race conditions?**
   - Use AbortController to cancel previous requests
   - Track request IDs and ignore stale responses
   - Debounce input to reduce API calls
   - Show loading indicator during validation
   - Cache results to avoid redundant calls

3. **What about accessibility?**
   - Use `aria-invalid` on invalid fields
   - Link errors with `aria-describedby`
   - Use `role="alert"` for error messages
   - Ensure proper label associations
   - Provide clear, descriptive error messages
   - Support keyboard navigation

4. **How to optimize performance with many fields?**
   - Use React.memo for individual field components
   - Debounce validation logic
   - Validate only touched fields
   - Use useCallback for event handlers
   - Consider form libraries (Formik, React Hook Form) for complex forms

5. **Should you validate on change, blur, or submit?**
   - **On Change**: Best UX, immediate feedback (but can be annoying)
   - **On Blur**: Good balance, validates when user leaves field
   - **On Submit**: Validates everything at once (minimum annoyance)
   - **Best Practice**: Validate on blur + change (after first blur) + submit

6. **How to handle form reset and dirty state?**
   - Track original values separately
   - Compare current values with originals
   - Show "unsaved changes" warning
   - Disable reset button if no changes
   - Use libraries like Formik for built-in dirty tracking

7. **What are common validation pitfalls?**
   - Not sanitizing input (XSS vulnerabilities)
   - Client-side validation only (always validate server-side too)
   - Poor error messages ("Invalid input" vs "Email must contain @")
   - Not handling edge cases (empty strings, whitespace, null)
   - Blocking form submission on warnings (vs errors)

8. **When to use form libraries?**
   - **Simple forms**: Build from scratch (learning exercise)
   - **Complex forms**: Use Formik, React Hook Form, or Final Form
   - Benefits: Built-in validation, error handling, performance optimization
   - Trade-off: Learning curve, bundle size increase
