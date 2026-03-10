---
name: application-performance-performance-optimization
description: "Optimize end-to-end application performance with profiling, observability, and backend/frontend tuning. Use when coordinating performance optimization across the stack."
risk: unknown
source: community
date_added: "2026-02-27"
---

Optimize application performance end-to-end using specialized performance and optimization agents.

## Use this skill when
- Coordinating performance optimization across backend, frontend, and infrastructure
- Establishing baselines and profiling to identify bottlenecks
- Designing load tests, performance budgets, or capacity plans
- Building observability for performance and reliability targets

## Do not use this skill when
- The task is a small localized fix with no broader performance goals
- There is no access to metrics, tracing, or profiling data
- The request is unrelated to performance or scalability

## Instructions
1. Confirm performance goals, constraints, and target metrics.
2. Establish baselines with profiling, tracing, and real-user data.
3. Execute phased optimizations across the stack with measurable impact.
4. Validate improvements and set guardrails to prevent regressions.

## Safety
- Avoid load testing production without approvals and safeguards.
- Roll out performance changes gradually with rollback plans.

---

## Phase 1: Performance Profiling & Baseline

### 1. Comprehensive Performance Profiling
- Profile application performance comprehensively. Generate flame graphs for CPU usage, heap dumps for memory analysis, trace I/O operations, and identify hot paths.
- Use APM tools like DataDog or New Relic if available.
- Include database query profiling, API response times, and frontend rendering metrics.
- Establish performance baselines for all critical user journeys.
- **Output**: Detailed performance profile with flame graphs, memory analysis, bottleneck identification, baseline metrics

### 2. Observability Stack Assessment
- Assess current observability setup. Review existing monitoring, distributed tracing with OpenTelemetry, log aggregation, and metrics collection.
- Identify gaps in visibility, missing metrics, and areas needing better instrumentation.
- Recommend APM tool integration and custom metrics for business-critical operations.
- **Output**: Observability assessment report, instrumentation gaps, monitoring recommendations

### 3. User Experience Analysis
- Analyze user experience metrics. Measure Core Web Vitals (LCP, FID, CLS), page load times, time to interactive, and perceived performance.
- Use Real User Monitoring (RUM) data if available.
- Identify user journeys with poor performance and their business impact.
- **Output**: UX performance report, Core Web Vitals analysis, user impact assessment

---

## Phase 2: Database & Backend Optimization

### 4. Database Performance Optimization
- Analyze slow query logs, create missing indexes, optimize execution plans, implement query result caching with Redis/Memcached.
- Review connection pooling, prepared statements, and batch processing opportunities.
- Consider read replicas and database sharding if needed.
- **Output**: Optimized queries, new indexes, caching strategy, connection pool configuration

### 5. Backend Code & API Optimization
- Implement efficient algorithms, add application-level caching, optimize N+1 queries, use async/await patterns effectively.
- Implement pagination, response compression, GraphQL query optimization, and batch API operations.
- Add circuit breakers and bulkheads for resilience.
- **Output**: Optimized backend code, caching implementation, API improvements, resilience patterns

### 6. Microservices & Distributed System Optimization
- Analyze service-to-service communication, implement service mesh optimizations, optimize message queue performance (Kafka/RabbitMQ), reduce network hops.
- Implement distributed caching strategies and optimize serialization/deserialization.
- **Output**: Service communication improvements, message queue optimization, distributed caching setup

---

## Phase 3: Frontend & CDN Optimization

### 7. Frontend Bundle & Loading Optimization
- Implement code splitting, tree shaking, lazy loading, and dynamic imports.
- Optimize bundle sizes with webpack/rollup analysis.
- Implement resource hints (prefetch, preconnect, preload).
- Optimize critical rendering path and eliminate render-blocking resources.
- **Output**: Optimized bundles, lazy loading implementation, improved Core Web Vitals

### 8. CDN & Edge Optimization
- Configure CloudFlare/CloudFront for optimal caching, implement edge functions for dynamic content.
- Set up image optimization with responsive images and WebP/AVIF formats.
- Configure HTTP/2 and HTTP/3, implement Brotli compression.
- Set up geographic distribution for global users.
- **Output**: CDN configuration, edge caching rules, compression setup, geographic optimization

### 9. Mobile & Progressive Web App Optimization
- Implement service workers for offline functionality, optimize for slow networks with adaptive loading.
- Reduce JavaScript execution time for mobile CPUs. Implement virtual scrolling for long lists.
- Optimize touch responsiveness and smooth animations.
- Consider React Native/Flutter specific optimizations if applicable.
- **Output**: Mobile-optimized code, PWA implementation, offline functionality

---

## Phase 4: Load Testing & Validation

### 10. Comprehensive Load Testing
- Conduct comprehensive load testing using k6/Gatling/Artillery.
- Design realistic load scenarios based on production traffic patterns.
- Test normal load, peak load, and stress scenarios. Include API testing, browser-based testing, and WebSocket testing if applicable.
- Measure response times, throughput, error rates, and resource utilization at various load levels.
- **Output**: Load test results, performance under load, breaking points, scalability analysis

### 11. Performance Regression Testing
- Create automated performance regression tests.
- Set up performance budgets for key metrics, integrate with CI/CD pipeline using GitHub Actions or similar.
- Create Lighthouse CI tests for frontend, API performance tests with Artillery, and database performance benchmarks.
- Implement automatic rollback triggers for performance regressions.
- **Output**: Performance test suite, CI/CD integration, regression prevention system

---

## Phase 5: Monitoring & Continuous Optimization

### 12. Production Monitoring Setup
- Set up APM with DataDog/New Relic/Dynatrace, configure distributed tracing with OpenTelemetry, implement custom business metrics.
- Create Grafana dashboards for key metrics, set up PagerDuty alerts for performance degradation.
- Define SLIs/SLOs for critical services with error budgets.
- **Output**: Monitoring dashboards, alert rules, SLI/SLO definitions, runbooks

### 13. Continuous Performance Optimization
- Create performance budget tracking, implement A/B testing for performance changes, set up continuous profiling in production.
- Document optimization opportunities backlog, create capacity planning models, and establish regular performance review cycles.
- **Output**: Performance budget tracking, optimization backlog, capacity planning, review process

---

## Configuration Options
- **performance_focus**: "latency" | "throughput" | "cost" | "balanced" (default: "balanced")
- **optimization_depth**: "quick-wins" | "comprehensive" | "enterprise" (default: "comprehensive")
- **tools_available**: ["datadog", "newrelic", "prometheus", "grafana", "k6", "gatling"]
- **budget_constraints**: Set maximum acceptable costs for infrastructure changes
- **user_impact_tolerance**: "zero-downtime" | "maintenance-window" | "gradual-rollout"

## Success Criteria
- **Response Time**: P50 < 200ms, P95 < 1s, P99 < 2s for critical endpoints
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Throughput**: Support 2x current peak load with <1% error rate
- **Database Performance**: Query P95 < 100ms, no queries > 1s
- **Resource Utilization**: CPU < 70%, Memory < 80% under normal load
- **Cost Efficiency**: Performance per dollar improved by minimum 30%
- **Monitoring Coverage**: 100% of critical paths instrumented with alerting
